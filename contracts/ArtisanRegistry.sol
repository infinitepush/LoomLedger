// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ArtisanRegistry
 * @dev Manages traditional handloom weavers registration and authenticity certificates.
 */
contract ArtisanRegistry {
    address public owner;

    struct Artisan {
        string name;
        string giNumber;
        string ipfsHash;
        bool verified;
    }

    mapping(address => Artisan) public artisans;
    mapping(address => bool) public registered;

    event ArtisanRegistered(address indexed artisanAddress, string name, string giNumber, string ipfsHash);
    event ArtisanVerified(address indexed artisanAddress);
    event ArtisanRejected(address indexed artisanAddress);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the registry owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /**
     * @dev Register a new artisan. Initially verified is false.
     */
    function registerArtisan(
        address artisanAddress,
        string calldata name,
        string calldata giNumber,
        string calldata ipfsHash
    ) external returns (bool) {
        require(artisanAddress != address(0), "Invalid artisan address");
        require(!registered[artisanAddress], "Artisan already registered");

        artisans[artisanAddress] = Artisan({
            name: name,
            giNumber: giNumber,
            ipfsHash: ipfsHash,
            verified: false
        });
        registered[artisanAddress] = true;

        emit ArtisanRegistered(artisanAddress, name, giNumber, ipfsHash);
        return true;
    }

    /**
     * @dev Verify a registered artisan (can only be executed by the admin moderator).
     */
    function verifyArtisan(address artisanAddress) external onlyOwner {
        require(registered[artisanAddress], "Artisan is not registered");
        require(!artisans[artisanAddress].verified, "Artisan is already verified");

        artisans[artisanAddress].verified = true;

        emit ArtisanVerified(artisanAddress);
    }

    /**
     * @dev Check if an artisan's wallet address is verified.
     */
    function isVerified(address artisanAddress) external view returns (bool) {
        return registered[artisanAddress] && artisans[artisanAddress].verified;
    }

    /**
     * @dev Get detailed information of a registered artisan.
     */
    function getArtisan(address artisanAddress)
        external
        view
        returns (
            string memory name,
            string memory giNumber,
            string memory ipfsHash,
            bool verified
        )
    {
        require(registered[artisanAddress], "Artisan is not registered");
        Artisan memory art = artisans[artisanAddress];
        return (art.name, art.giNumber, art.ipfsHash, art.verified);
    }

    /**
     * @dev Transfer registry ownership to a new admin address.
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid address for new owner");
        owner = newOwner;
    }
}
