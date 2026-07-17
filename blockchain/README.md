# 🔗 LoomLedger Blockchain Endpoints Server

A standalone Node.js Express server exposing endpoints to record Handloom Artisan authenticity, Product authenticity, and Digital Passports onto the Polygon Amoy blockchain and IPFS (via Pinata).

## 🚀 Setup & Execution

### 1. Install Dependencies
Navigate to the `blockchain` directory and install the required NPM packages:
```bash
cd blockchain
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and fill in your Pinata credentials, blockchain provider RPC, private key, and deployed contract addresses:
```bash
cp .env.example .env
```

**Key Parameters in `.env`:**
* `PINATA_JWT` or `PINATA_API_KEY`/`PINATA_API_SECRET`: Credentials to upload files/metadata directly to IPFS.
* `RPC_URL`: JSON-RPC URL for Polygon Amoy Testnet (e.g. infura, alchemy, or public RPCs).
* `PRIVATE_KEY`: Private key of the authorization oracle/deployer wallet to execute on-chain transactions.
* `ARTISAN_REGISTRY_ADDRESS` & `PASSPORT_CONTRACT_ADDRESS`: Deployed addresses of the respective smart contracts.

*Note: If these settings are left at their defaults, the server will gracefully run in **MOCK mode**, returning fake transaction hashes and mocked responses so you can test endpoints immediately without a live blockchain network or Pinata account.*

### 3. Run the Server
Start the Express server in development mode (with auto-reload on save):
```bash
npm run dev
```
Or start in production mode:
```bash
npm start
```
The server will run on **`http://localhost:5001`**.

---

## 📡 API Endpoints Reference

### 1. Health Check
* **Endpoint:** `GET /api/health`
* **Response:** Checks connection state, showing if Pinata is configured and whether blockchain integration is in `LIVE` or `MOCK` mode.

### 2. IPFS Upload (Immutable Proof)
* **Endpoint:** `POST /api/ipfs/upload-json`
* **Request Body:**
  ```json
  {
    "payload": {
      "any_key": "any_value",
      "textile_hash": "0x534a781b..."
    },
    "fileName": "proof_1234"
  }
  ```
* **Description:** Directly uploads custom JSON payloads to IPFS via Pinata.

### 3. Artisan Authenticity: Register Artisan
* **Endpoint:** `POST /api/artisan/register`
* **Request Body:**
  ```json
  {
    "name": "Ramesh Weaver",
    "walletAddress": "0x9876543210abcdef9876543210abcdef98765432",
    "giNumber": "GI-VARANASI-2026-9081",
    "district": "Varanasi",
    "state": "Uttar Pradesh",
    "bio": "Master Banarasi weaver with 25 years of ancestral weaving experience."
  }
  ```
* **Description:** Uploads the weaver's profile to IPFS and records their registration on-chain using the `ArtisanRegistry` contract.

### 4. Artisan Authenticity: Verify Status
* **Endpoint:** `GET /api/artisan/verify/:wallet`
* **Description:** Checks the blockchain to verify if the given artisan wallet address has been registered and certified.

### 5. Product Authenticity & Digital Passport: Mint Passport
* **Endpoint:** `POST /api/passport/mint`
* **Request Body:**
  ```json
  {
    "productName": "Heritage Kanjivaram Silk Saree",
    "price": 18500,
    "weaverAddress": "0x9876543210abcdef9876543210abcdef98765432",
    "weaverName": "Ramesh Weaver",
    "fabric": "Mulberry Silk",
    "threadCount": "120 TPI",
    "loomHours": "85 Hours",
    "giCertified": true,
    "specifications": {
      "Length": "6.2 Meters",
      "Zari Gold Type": "Pure Silver thread dipped in 24k Gold"
    }
  }
  ```
* **Description:** Uploads the product details, yarn/weaving timelines, and artisan characteristics as digital passport metadata to IPFS, then mints a Digital Passport NFT representing the item.

### 6. Digital Passport Query
* **Endpoint:** `GET /api/passport/:tokenId`
* **Description:** Queries the contract for the passport's token metadata link, resolves the IPFS CID, and returns the full digital passport document (including historical weave timeline).
