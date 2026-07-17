"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const env_1 = require("./config/env");
const pixel = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
async function testCloudinary(cloudName) {
    console.log(`\nTesting cloud name: "${cloudName}"`);
    cloudinary_1.v2.config({
        cloud_name: cloudName,
        api_key: env_1.env.CLOUDINARY_API_KEY,
        api_secret: env_1.env.CLOUDINARY_API_SECRET,
    });
    return new Promise((resolve) => {
        cloudinary_1.v2.uploader.upload_stream({ folder: 'test', resource_type: 'image' }, (error, result) => {
            if (error) {
                console.log(`❌ Failed:`, error.message || error);
                resolve(false);
            }
            else {
                console.log(`✔ Success! Secure URL:`, result?.secure_url);
                resolve(true);
            }
        }).end(pixel);
    });
}
async function run() {
    const variants = [
        'loomledger-rag',
        'loom-ledger-rag',
        'loom_ledger',
        'loomledger',
        'loom-ledger',
        'Loom_Ledger'
    ];
    for (const variant of variants) {
        const success = await testCloudinary(variant);
        if (success) {
            console.log(`\n🎉 Found working cloud name: "${variant}"!`);
            break;
        }
    }
}
run();
//# sourceMappingURL=test_cloudinary.js.map