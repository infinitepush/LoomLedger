"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("./database/prisma");
async function main() {
    try {
        const users = await prisma_1.prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
            take: 5,
        });
        console.log('--- RECENT USERS ---');
        users.forEach(u => {
            console.log(`- ID: ${u.id}, Name: ${u.name}, Email: ${u.email}, Role: ${u.role}, CreatedAt: ${u.createdAt}`);
        });
        const artisans = await prisma_1.prisma.artisan.findMany({
            include: { user: true },
            orderBy: { createdAt: 'desc' },
            take: 5,
        });
        console.log('\n--- RECENT ARTISANS ---');
        artisans.forEach(a => {
            console.log(`- ID: ${a.id}, Name: ${a.user?.name}, Email: ${a.user?.email}, Status: ${a.status}, Verified: ${a.verified}, Wallet: ${a.walletAddress}`);
        });
    }
    catch (err) {
        console.error('Error querying DB:', err.message || err);
    }
}
main();
//# sourceMappingURL=check_db.js.map