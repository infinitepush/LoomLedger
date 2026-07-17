# 🧶 LoomLedger
> **Digital Trust Platform for Authentic Handloom Products**

LoomLedger is a corporate-grade, production-ready SaaS + E-commerce platform that combats the handloom forgery crisis. By bridging a **Node.js Express.js API Backend** with **Generative AI** storytelling and a **Polygon Amoy Blockchain** immutable record registry, the platform establishes verifiable provenance for traditional Indian textiles (e.g. Banarasi Silk, Kanjivaram, Chanderi).

---

## 🌟 Key Features

* **Decentralized Product Passports:** Every product is minted to the Polygon Amoy test network, locking details like fiber warp/weft composition, thread counts, loom hours, and regional validation.
* **Artisan Wallet Stamps:** Authenticated master weavers hold unique cryptographic wallet signatures and Geographical Indication (GI) license numbers.
* **AI-Generated Weaver Chronicles:** LoomLedger leverages Gemini AI to extract design hallmarks and craft timelines based on weave styles, displaying interactive, generation-spanning storytelling blogs.
* **Role-Based Workspaces:**
  * **Buyer Console:** Access purchase histories, manage wishlists, bookmark artisans, and retrieve delivered digital certificates.
  * **Artisan Dashboard:** Upload saree drafts, run AI spec generators, mint QR codes, and ship products.
  * **Admin Moderator:** Inspect GI license numbers and weaver cards, approving profiles to automatically issue on-chain digital identities.
* **Public Provenance Verification:** A central verification portal to scan high-security QR signatures or query block hashes, rendering provenance timelines and certificate PDF download links.

---

## 🛠️ Tech Stack

### Frontend
* **Framework:** Next.js 16 (App Router) + TypeScript + React 19
* **Styling:** Tailwind CSS v4 (customized heritage HSL token system)
* **Animations:** Framer Motion (micro-animations, state transition cues)
* **State & Queries:** Custom AppContext state provider + TanStack React Query

### Backend
* **Server:** Node.js + Express.js + TypeScript
* **ORM:** Prisma ORM
* **Database:** PostgreSQL (Neon Serverless PostgreSQL ready)
* **Authentication:** JWT (Access + Refresh Tokens) & bcrypt hashing
* **AI Engine:** Gemini 2.5 Flash API (Google Gen AI)
* **Payment Gateway:** Razorpay API
* **Cloud Storage:** Cloudinary SDK
* **Blockchain Integrator:** ethers.js (Polygon Amoy Testnet Integration)
* **Logger:** Winston Logger

---

## 🚀 Getting Started

LoomLedger runs as a monorepo containing a Next.js frontend at the root and an Express.js backend inside the `server/` directory.

### 1. Installation
Install root dependencies (frontend):
```bash
npm install
```

Install backend dependencies:
```bash
cd server
npm install
```

### 2. Environment Configuration
Create a `.env` file inside the `server/` directory based on the provided `server/.env.example`:
```env
PORT=5000
DATABASE_URL="postgresql://postgres:password@localhost:5432/loomledger?schema=public"
JWT_SECRET="your-jwt-secret-key"
JWT_REFRESH_SECRET="your-jwt-refresh-secret"

# Integrations (Optional for development fallbacks)
CLOUDINARY_CLOUD_NAME="your-cloudinary-name"
CLOUDINARY_API_KEY="your-cloudinary-key"
CLOUDINARY_API_SECRET="your-cloudinary-secret"
GEMINI_API_KEY="your-gemini-key"
RAZORPAY_KEY_ID="your-razorpay-key"
RAZORPAY_KEY_SECRET="your-razorpay-secret"
POLYGON_RPC_URL="https://rpc-amoy.polygon.technology"
```

### 3. Database Migration and Seeding
Ensure your local or Neon PostgreSQL instance is running. Run migrations and seed files inside the `server/` directory:
```bash
# Generate Prisma Client
npx prisma generate

# Push schema directly to database
npx prisma db push

# Seed 10 artisans, 30 buyers, 100 products, and 50 orders
npm run db:seed
```

### 4. Running the Application
Start the backend server (from the `server/` directory):
```bash
npm run dev
```

Start the frontend server (from the root directory):
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🔑 Demo Account Credentials

You can log in directly using the following credentials seeded in the database:

* **Buyer Workspace:** `buyer1@example.com` / `password123`
* **Artisan Workspace:** `artisan1@example.com` / `password123`
* **Admin Moderator Console:** `admin@loomledger.com` / `password123`

---

## 📂 Project Structure

```text
├── src/                      # Next.js App Router Frontend
│   ├── app/                  # Next.js page routers & components
│   │   ├── admin/            # Admin moderation console dashboards
│   │   ├── artisan/          # Artisan profiles & settings subviews
│   │   ├── buyer/            # Buyer accounts & certificates vault
│   │   ├── cart/             # Shopping Cart routing
│   │   ├── marketplace/      # Verified saree lists & dynamic details
│   │   ├── stories/          # AI Weaver Chronicles blogs
│   │   └── verify/           # Provenance validation scanner
│   ├── components/           # Decoupled UI modules and layouts
│   └── context/              # AppContext provider (API communication layer)
│
└── server/                   # Express.js API Backend
    ├── prisma/               # Prisma Database Schema & Seed scripts
    └── src/
        ├── ai/               # Gemini AI API wrapper
        ├── auth/             # JWT & Password utility helpers
        ├── blockchain/       # Ethers.js integration contract layer
        ├── controllers/      # Route controllers
        ├── middlewares/      # CORS, JWT verification, and roles
        ├── payments/         # Razorpay checkout wrapper
        ├── repositories/     # Database access abstraction wrappers
        ├── routes/           # Express routes mapping
        ├── services/         # Business logic service layer
        ├── storage/          # Cloudinary uploads integration
        └── validators/       # Zod schemas for input validation
```

---

## 📄 License
This project is open-source and developed as part of the Handloom Trust platform initiative.
