"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
async function checkBalance() {
    const rpc = 'https://polygon-amoy-bor-rpc.publicnode.com';
    const provider = new ethers_1.ethers.JsonRpcProvider(rpc);
    const deployer = '0x522c3634ef69fe40994f7ffc69b56209cc00d06a';
    try {
        const balance = await provider.getBalance(deployer);
        console.log(`Balance of Deployer (${deployer}):`, ethers_1.ethers.formatEther(balance), 'POL');
    }
    catch (err) {
        console.error('Error fetching balance:', err.message || err);
    }
}
checkBalance();
//# sourceMappingURL=check_balance.js.map