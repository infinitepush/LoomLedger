"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
async function testAll() {
    try {
        console.log('--- checking microservice health ---');
        const healthRes = await (0, node_fetch_1.default)('https://loomledger.onrender.com/api/health');
        const healthJson = await healthRes.json();
        console.log('Health Check Status:', healthRes.status);
        console.log('Health Check Response:', JSON.stringify(healthJson, null, 2));
        console.log('\n--- testing artisan registration payload ---');
        const payload = {
            name: 'Waiz Alam Test',
            walletAddress: '0x' + Array(40).fill('1').join(''),
            giNumber: 'GI-TEST-12345',
            district: 'Ranchi',
            state: 'Jharkhand',
            bio: 'Test description of artisan.',
        };
        console.log('Sending Payload:', JSON.stringify(payload, null, 2));
        const regRes = await (0, node_fetch_1.default)('https://loomledger.onrender.com/api/artisan/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        console.log('Register Status:', regRes.status);
        const regJson = await regRes.json();
        console.log('Register Response:', JSON.stringify(regJson, null, 2));
    }
    catch (err) {
        console.error('Error during fetch:', err.message || err);
    }
}
testAll();
//# sourceMappingURL=test_blockchain.js.map