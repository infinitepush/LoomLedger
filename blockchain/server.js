require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { ethers } = require('ethers');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Log incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ABIs for Smart Contracts
const ARTISAN_REGISTRY_ABI = [
  "function registerArtisan(address artisanAddress, string name, string giNumber, string ipfsHash) external returns (bool)",
  "function verifyArtisan(address artisanAddress) external",
  "function isVerified(address artisanAddress) external view returns (bool)",
  "function getArtisan(address artisanAddress) external view returns (string memory name, string memory giNumber, string memory ipfsHash, bool verified)"
];

const PASSPORT_CONTRACT_ABI = [
  "function mintPassport(address weaver, string memory ipfsHash) external returns (uint256)",
  "function tokenURI(uint256 tokenId) external view returns (string memory)",
  "function getPassportDetails(uint256 tokenId) external view returns (address weaver, string memory ipfsHash, uint256 timestamp)"
];

// Helper: Setup Blockchain Provider & Wallet
function getContractInstances() {
  const { RPC_URL, PRIVATE_KEY, ARTISAN_REGISTRY_ADDRESS, PASSPORT_CONTRACT_ADDRESS } = process.env;

  const isConfigured = 
    RPC_URL && !RPC_URL.includes('your_') &&
    PRIVATE_KEY && !PRIVATE_KEY.includes('your_') &&
    ARTISAN_REGISTRY_ADDRESS && !ARTISAN_REGISTRY_ADDRESS.includes('address') &&
    PASSPORT_CONTRACT_ADDRESS && !PASSPORT_CONTRACT_ADDRESS.includes('address');

  if (!isConfigured) {
    console.warn("⚠️ Blockchain credentials or contract addresses are not fully configured in .env. Running in MOCK mode.");
    return { mockMode: true };
  }

  try {
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

    const artisanRegistry = new ethers.Contract(ARTISAN_REGISTRY_ADDRESS, ARTISAN_REGISTRY_ABI, wallet);
    const passportContract = new ethers.Contract(PASSPORT_CONTRACT_ADDRESS, PASSPORT_CONTRACT_ABI, wallet);

    return {
      mockMode: false,
      artisanRegistry,
      passportContract,
      walletAddress: wallet.address
    };
  } catch (error) {
    console.error("❌ Error setting up ethers provider or wallet:", error.message);
    return { mockMode: true, error: error.message };
  }
}

// Helper: Upload JSON to Pinata IPFS
async function uploadToPinata(payload, fileName) {
  const { PINATA_API_KEY, PINATA_API_SECRET, PINATA_JWT } = process.env;
  const isPinataConfigured = 
    (PINATA_API_KEY && !PINATA_API_KEY.includes('your_')) || 
    (PINATA_JWT && !PINATA_JWT.includes('your_'));

  if (!isPinataConfigured) {
    console.warn("⚠️ Pinata API credentials are not configured in .env. Returning Mock IPFS CID.");
    return {
      IpfsHash: `QmFakeCID${Math.random().toString(16).substring(2, 12).toUpperCase()}LoomLedger`,
      PinSize: 1024,
      Timestamp: new Date().toISOString(),
      isMock: true
    };
  }

  const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';
  const data = {
    pinataContent: payload,
    pinataMetadata: {
      name: fileName || `loomledger_${Date.now()}`
    }
  };

  const headers = {};
  if (PINATA_JWT && !PINATA_JWT.includes('your_')) {
    headers['Authorization'] = `Bearer ${PINATA_JWT}`;
  } else {
    headers['pinata_api_key'] = PINATA_API_KEY;
    headers['pinata_secret_api_key'] = PINATA_API_SECRET;
  }

  const response = await axios.post(url, data, { headers });
  return response.data;
}

// --- API ENDPOINTS ---

// Health Check
app.get('/api/health', (req, res) => {
  const { mockMode } = getContractInstances();
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    blockchainMode: mockMode ? 'MOCK' : 'LIVE',
    pinataConfigured: !!(process.env.PINATA_API_KEY || process.env.PINATA_JWT)
  });
});

/**
 * 1. IPFS Immutable Proof Endpoint
 * Direct upload of JSON metadata to IPFS via Pinata.
 */
app.post('/api/ipfs/upload-json', async (req, res) => {
  try {
    const { payload, fileName } = req.body;
    if (!payload) {
      return res.status(400).json({ error: "payload field is required" });
    }

    const pinataResponse = await uploadToPinata(payload, fileName);
    const gatewayUrl = `${process.env.PINATA_GATEWAY || 'https://gateway.pinata.cloud'}/ipfs/${pinataResponse.IpfsHash}`;

    res.json({
      success: true,
      cid: pinataResponse.IpfsHash,
      gatewayUrl,
      size: pinataResponse.PinSize,
      timestamp: pinataResponse.Timestamp || new Date().toISOString(),
      isMock: !!pinataResponse.isMock
    });
  } catch (error) {
    console.error("❌ Pinata Upload Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to upload to IPFS", details: error.response?.data || error.message });
  }
});

/**
 * 2. Artisan Authenticity: Register Artisan
 * Uploads profile metadata to IPFS and logs registration on-chain.
 */
app.post('/api/artisan/register', async (req, res) => {
  try {
    const { name, walletAddress, giNumber, district, state, bio } = req.body;
    
    if (!name || !walletAddress) {
      return res.status(400).json({ error: "name and walletAddress are required" });
    }

    const metadata = {
      type: "ArtisanProfile",
      name,
      walletAddress,
      giNumber: giNumber || "N/A",
      location: `${district || 'Unknown'}, ${state || 'Unknown'}`,
      bio: bio || "",
      timestamp: new Date().toISOString()
    };

    // 1. Upload metadata to IPFS
    const pinataRes = await uploadToPinata(metadata, `artisan_${walletAddress.substring(0, 8)}`);
    const ipfsHash = pinataRes.IpfsHash;

    // 2. Call Smart Contract
    const { mockMode, artisanRegistry } = getContractInstances();
    let txHash = "0x" + Math.random().toString(16).substring(2, 12) + "mocktxhash7a3b9c1d2e4f5a6b7c8d9e0f1a2b3c4d";
    let blockchainStatus = "MOCKED";

    if (!mockMode) {
      try {
        console.log(`[Artisan Auth] Registering artisan ${walletAddress} on-chain...`);
        const tx = await artisanRegistry.registerArtisan(walletAddress, name, giNumber || "", ipfsHash);
        const receipt = await tx.wait();
        txHash = receipt.hash;
        blockchainStatus = "LIVE";
      } catch (blockchainErr) {
        console.error("❌ On-chain Artisan registration failed, falling back to mock tx:", blockchainErr.message);
        blockchainStatus = "FALLBACK_MOCK";
      }
    }

    res.json({
      success: true,
      artisan: { name, walletAddress, giNumber, ipfsHash },
      ipfsUrl: `${process.env.PINATA_GATEWAY || 'https://gateway.pinata.cloud'}/ipfs/${ipfsHash}`,
      txHash,
      blockchainStatus
    });
  } catch (error) {
    console.error("❌ Artisan Registration Error:", error.message);
    res.status(500).json({ error: "Failed to register artisan", details: error.message });
  }
});

/**
 * 3. Artisan Authenticity: Verify/Check status
 * Queries blockchain contract to see if an artisan wallet is verified.
 */
app.get('/api/artisan/verify/:wallet', async (req, res) => {
  try {
    const { wallet } = req.params;
    const { mockMode, artisanRegistry } = getContractInstances();

    if (mockMode) {
      // Mocked check: return true if wallet isn't default empty
      const isVerified = wallet.startsWith('0x') && wallet.length === 42;
      return res.json({
        walletAddress: wallet,
        verified: isVerified,
        giNumber: "GI-VARANASI-2026-9081",
        blockchainStatus: "MOCKED"
      });
    }

    console.log(`[Artisan Auth] Checking verification for ${wallet} on-chain...`);
    const isVerified = await artisanRegistry.isVerified(wallet);
    let artisanDetails = { name: "", giNumber: "", ipfsHash: "" };

    try {
      const details = await artisanRegistry.getArtisan(wallet);
      artisanDetails = {
        name: details[0],
        giNumber: details[1],
        ipfsHash: details[2]
      };
    } catch (e) {
      console.warn("Could not retrieve artisan details from contract:", e.message);
    }

    res.json({
      walletAddress: wallet,
      verified: isVerified,
      ...artisanDetails,
      blockchainStatus: "LIVE"
    });
  } catch (error) {
    console.error("❌ Artisan Verify Error:", error.message);
    res.status(500).json({ error: "Failed to verify artisan", details: error.message });
  }
});

/**
 * 4. Product Authenticity & Digital Passport: Register Product/Mint Passport
 * Uploads product specifications to IPFS and mints Digital Passport NFT on-chain.
 */
app.post('/api/passport/mint', async (req, res) => {
  try {
    const { 
      productName, 
      price, 
      weaverAddress, 
      weaverName,
      fabric, 
      threadCount, 
      loomHours, 
      giCertified,
      specifications 
    } = req.body;

    if (!productName || !weaverAddress) {
      return res.status(400).json({ error: "productName and weaverAddress are required" });
    }

    const passportMetadata = {
      name: `LoomLedger Passport: ${productName}`,
      description: `Verifiable Digital Provenance Passport for authentic ${fabric || 'handloom'} textile woven by ${weaverName || 'master artisan'}.`,
      image: `ipfs://QmPlaceholderImageHash`, // User can override or provide
      attributes: [
        { trait_type: "Artisan Name", value: weaverName || "Master Weaver" },
        { trait_type: "Artisan Wallet", value: weaverAddress },
        { trait_type: "Fabric Type", value: fabric || "Handloom" },
        { trait_type: "Thread Count", value: threadCount || "N/A" },
        { trait_type: "Loom Hours", value: loomHours || "N/A" },
        { trait_type: "GI Certified", value: giCertified ? "Yes" : "No" }
      ],
      specifications: specifications || {},
      provenanceTimeline: [
        { stage: "Yarn Sourcing & Dyeing", date: new Date().toISOString().split('T')[0], status: "Verified" },
        { stage: "Loom Drafting & Weaving", date: new Date().toISOString().split('T')[0], status: "Verified" },
        { stage: "Digital Passport Generated", date: new Date().toISOString().split('T')[0], status: "Verified" }
      ],
      timestamp: new Date().toISOString()
    };

    // 1. Upload Product Metadata to IPFS
    const pinataRes = await uploadToPinata(passportMetadata, `passport_${Date.now()}`);
    const ipfsHash = pinataRes.IpfsHash;
    const tokenURI = `ipfs://${ipfsHash}`;

    // 2. Mint NFT Passport via Smart Contract
    const { mockMode, passportContract } = getContractInstances();
    let txHash = "0x" + Math.random().toString(16).substring(2, 12) + "mockmintf9a0c1d2e3f4a5b6c7d8e9f0a1b2c3d4";
    let tokenId = Math.floor(Math.random() * 1000) + 1;
    let blockchainStatus = "MOCKED";

    if (!mockMode) {
      try {
        console.log(`[Digital Passport] Minting NFT for product with URI: ${tokenURI}`);
        const tx = await passportContract.mintPassport(weaverAddress, ipfsHash);
        const receipt = await tx.wait();
        txHash = receipt.hash;
        
        // Try parsing TokenId from Transfer event if standard ERC721
        if (receipt.logs && receipt.logs[0]) {
          try {
            tokenId = parseInt(receipt.logs[0].topics[3], 16);
          } catch (_) {}
        }
        blockchainStatus = "LIVE";
      } catch (blockchainErr) {
        console.error("❌ On-chain minting failed, falling back to mock:", blockchainErr.message);
        blockchainStatus = "FALLBACK_MOCK";
      }
    }

    res.json({
      success: true,
      tokenId: tokenId.toString(),
      ipfsHash,
      tokenURI,
      gatewayUrl: `${process.env.PINATA_GATEWAY || 'https://gateway.pinata.cloud'}/ipfs/${ipfsHash}`,
      txHash,
      blockchainStatus,
      metadata: passportMetadata
    });
  } catch (error) {
    console.error("❌ Passport Minting Error:", error.message);
    res.status(500).json({ error: "Failed to mint digital passport", details: error.message });
  }
});

/**
 * 5. Digital Passport query
 * Resolves tokenId on-chain, fetches IPFS metadata, and displays the passport.
 */
app.get('/api/passport/:tokenId', async (req, res) => {
  try {
    const { tokenId } = req.params;
    const { mockMode, passportContract } = getContractInstances();

    let ipfsHash = "";
    let weaverAddress = "0x0000000000000000000000000000000000000000";
    let blockchainStatus = "MOCKED";

    if (mockMode) {
      return res.json({
        tokenId,
        blockchainStatus: "MOCKED",
        ipfsHash: "QmFakeCID123LoomLedger",
        tokenURI: "ipfs://QmFakeCID123LoomLedger",
        weaver: "0xArtisanWalletAddress",
        metadata: {
          name: `LoomLedger Passport: Banarasi Brocade Saree #${tokenId}`,
          description: "Mocked digital passport resolved for testing.",
          attributes: [
            { trait_type: "Artisan Name", value: "Ramesh Weaver" },
            { trait_type: "Fabric Type", value: "Banarasi Silk" }
          ]
        }
      });
    }

    console.log(`[Digital Passport] Resolving details for tokenId ${tokenId}...`);
    try {
      const details = await passportContract.getPassportDetails(tokenId);
      weaverAddress = details[0];
      ipfsHash = details[1];
      blockchainStatus = "LIVE";
    } catch (e) {
      console.warn("Fallback to query tokenURI directly:");
      const tokenUri = await passportContract.tokenURI(tokenId);
      ipfsHash = tokenUri.replace("ipfs://", "");
      blockchainStatus = "LIVE";
    }

    // Fetch details from IPFS gateway
    let metadata = {};
    try {
      const gatewayUrl = `${process.env.PINATA_GATEWAY || 'https://gateway.pinata.cloud'}/ipfs/${ipfsHash}`;
      const ipfsRes = await axios.get(gatewayUrl, { timeout: 5000 });
      metadata = ipfsRes.data;
    } catch (ipfsFetchErr) {
      console.warn(`Could not fetch metadata from gateway for ${ipfsHash}, returning raw details:`, ipfsFetchErr.message);
    }

    res.json({
      tokenId,
      weaverAddress,
      ipfsHash,
      tokenURI: `ipfs://${ipfsHash}`,
      metadata,
      blockchainStatus
    });
  } catch (error) {
    console.error("❌ Passport Resolve Error:", error.message);
    res.status(500).json({ error: "Failed to query passport details", details: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 LoomLedger Blockchain Endpoints Server running on http://localhost:${PORT}`);
  console.log(`📌 Health check: http://localhost:${PORT}/api/health`);
});
