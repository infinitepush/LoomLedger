// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title PassportContract
 * @dev Mints and manages ERC721 Digital Provenance Passports representing handloom textiles on-chain.
 */
contract PassportContract is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    struct PassportDetails {
        address weaver;
        string ipfsHash;
        uint256 timestamp;
    }

    // Mapping from tokenId to passport specifics
    mapping(uint256 => PassportDetails) public passports;

    event PassportMinted(uint256 indexed tokenId, address indexed weaver, string ipfsHash);

    constructor() ERC721("LoomLedger Passport", "LLP") Ownable(msg.sender) {
        _nextTokenId = 1;
    }

    /**
     * @dev Mints a digital passport NFT for an authentic saree/product.
     * @param weaver The address of the artisan who wove the textile.
     * @param ipfsHash The IPFS CID containing the product metadata & timeline.
     * @return The tokenId of the newly minted NFT.
     */
    function mintPassport(address weaver, string memory ipfsHash) external onlyOwner returns (uint256) {
        require(weaver != address(0), "Weaver address cannot be zero address");
        require(bytes(ipfsHash).length > 0, "IPFS hash cannot be empty");

        uint256 tokenId = _nextTokenId;
        _nextTokenId++;

        // Mint NFT to the weaver (as the authentic creator/recipient)
        _safeMint(weaver, tokenId);
        
        // Set IPFS URI
        string memory tokenURI = string(abi.encodePacked("ipfs://", ipfsHash));
        _setTokenURI(tokenId, tokenURI);

        // Store passport details
        passports[tokenId] = PassportDetails({
            weaver: weaver,
            ipfsHash: ipfsHash,
            timestamp: block.timestamp
        });

        emit PassportMinted(tokenId, weaver, ipfsHash);
        
        return tokenId;
    }

    /**
     * @dev Retrieve specific details of a digital passport on-chain.
     */
    function getPassportDetails(uint256 tokenId)
        external
        view
        returns (
            address weaver,
            string memory ipfsHash,
            uint256 timestamp
        )
    {
        // _ownerOf is the internal check in OpenZeppelin ERC721 to see if token exists
        require(_ownerOf(tokenId) != address(0), "Passport token does not exist");
        PassportDetails memory details = passports[tokenId];
        return (details.weaver, details.ipfsHash, details.timestamp);
    }
}
