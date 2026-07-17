"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
async function testScan() {
    const address = '0x522c3634ef69fe40994f7ffc69b56209cc00d06a';
    const url = `https://api-amoy.polygonscan.com/api?module=account&action=balance&address=${address}&tag=latest`;
    try {
        const res = await (0, node_fetch_1.default)(url);
        const json = await res.json();
        console.log('Polygonscan API Response:', JSON.stringify(json, null, 2));
        if (json.status === '1' && json.result) {
            const balanceWei = BigInt(json.result);
            const balanceEth = Number(balanceWei) / 1e18;
            console.log(`Balance of Deployer: ${balanceEth} POL`);
        }
        else {
            console.log('Unable to retrieve balance from API response.');
        }
    }
    catch (err) {
        console.error('Error fetching balance from API:', err.message || err);
    }
}
testScan();
//# sourceMappingURL=check_api.js.map