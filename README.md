<div align="center">

# 🪡 LoomLedger

### Blockchain-Powered Digital Trust Platform for Authentic Indian Handloom

<p>
Bridging traditional Indian artisans with conscious buyers through
<b>Blockchain</b>, <b>AI</b>, and <b>Digital Product Passports</b>.
</p>

<p>
<img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" />
<img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript" />
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js" />
<img src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql" />
<img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma" />
<img src="https://img.shields.io/badge/Polygon-Amoy-8247E5?style=for-the-badge&logo=polygon" />
<img src="https://img.shields.io/badge/Gemini-AI-4285F4?style=for-the-badge" />
</p>

<p>
<a href="https://loom-ledger.vercel.app">
<img src="https://img.shields.io/badge/🌐 Live Demo-black?style=for-the-badge">
</a>

<a href="https://loomledger-d1zj.onrender.com/api">
<img src="https://img.shields.io/badge/⚡ Backend API-46E3B7?style=for-the-badge">
</a>
</p>

</div>

---

# 📖 Overview

LoomLedger is a blockchain-powered digital trust platform built to preserve the authenticity of Indian handloom products.

The platform enables verified artisans to directly list and sell their products while providing buyers with transparent proof of authenticity through **Digital Product Passports (DPPs)** secured on the **Polygon Amoy Blockchain**.

By combining **AI-powered storytelling**, **blockchain verification**, and a **modern marketplace**, LoomLedger creates a trusted ecosystem that benefits artisans, buyers, and regulatory authorities.

---

# 🚨 Problem Statement

India's **₹70,000+ Crore Handloom Industry** faces several critical challenges:

- Counterfeit power-loom products sold as authentic handloom.
- No transparent way to verify artisan identity or product origin.
- GI-certified products being duplicated and misrepresented.
- Middlemen reducing artisan profits significantly.
- Lack of digital proof of authenticity throughout the product lifecycle.

---

<table>
<tr>

<td width="20%" align="center">

### 🔗 Blockchain

Digital Product Passports

</td>

<td width="20%" align="center">

### 🤖 AI

Gemini-powered Product Intelligence

</td>

<td width="20%" align="center">

### 💬 RAG Chatbot

Knowledge-based Handloom Assistant

</td>

<td width="20%" align="center">

### 🛍 Marketplace

Direct Buyer ↔ Artisan Commerce

</td>

<td width="20%" align="center">

### 📱 QR Verify

Blockchain Authentication

</td>

</tr>
</table>

# ✨ Features

## 👨‍🎨 Artisan Dashboard

- Secure Artisan Registration
- Blockchain-backed Verification
- AI-assisted Product Listing
- Cloudinary Image Upload
- Product Management
- Sales Analytics
- Order Management
- Digital Passport Generation

---

## 🛒 Buyer Dashboard

- Public Marketplace
- Product Search & Filtering
- Wishlist
- Shopping Cart
- Saved Addresses
- Order Tracking
- Purchased Product Certificates
- QR-based Product Verification

---

## 🛡️ Admin Dashboard

- Artisan Verification
- Product Moderation
- Marketplace Management
- Blockchain Registration
- Analytics Dashboard

---

# 🔗 Blockchain Workflow

```text
Artisan Registration

        │
        ▼

Backend Validation

        │
        ▼

Polygon Amoy Smart Contract

        │
        ▼

Digital Product Passport

        │
        ▼

QR Code Generation

        │
        ▼

Marketplace Listing

        │
        ▼

Buyer Verification
```

---

# 🏗️ System Architecture

```text
                 Buyer / Artisan / Admin
                           │
                           ▼
                    Next.js Frontend
                           │
                     REST API (HTTPS)
                           │
                           ▼
                   Express.js Backend
       ┌────────────────┼────────────────┐
       ▼                ▼                ▼
 PostgreSQL        Gemini AI      Polygon Amoy
       │                                 │
       └───────────────┬─────────────────┘
                       ▼
          Digital Product Passport (DPP)
```

---

# 🛠️ Tech Stack

| Layer | Technologies |
|--------|--------------|
| **Frontend** | Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons |
| **Backend** | Node.js, Express.js, TypeScript, JWT Authentication |
| **Database** | PostgreSQL, Prisma ORM |
| **Blockchain** | Solidity, Hardhat, Ethers.js, Polygon Amoy Testnet |
| **AI** | Gemini 2.5 Flash |
| **Storage** | Cloudinary |
| **Payments** | Razorpay |
| **Deployment** | Vercel, Render |

---

# 📂 Project Structure

```text
LoomLedger
│
├── src/                      # Frontend
├── public/
├── server/
│   ├── src/
│   ├── prisma/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── services/
│   └── package.json
│
├── blockchain/
├── contracts/
│
├── package.json
└── README.md
```

---

# 🚀 Local Setup

## Clone Repository

```bash
git clone https://github.com/infinitepush/LoomLedger.git

cd LoomLedger
```

---

## Frontend

```bash
npm install

npm run dev
```

---

## Backend

```bash
cd server

npm install

npx prisma generate

npx prisma db push

npm run dev
```

---

# 🔐 Environment Variables

## Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## Backend (.env)

```env
DATABASE_URL=
JWT_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

GEMINI_API_KEY=

RPC_URL=
PRIVATE_KEY=
CONTRACT_ADDRESS=

PORT=5000
```

---

# 🌍 Live Deployment

| Service | URL |
|----------|-----|
| **Frontend** | https://loom-ledger.vercel.app |
| **Backend API** | https://loomledger-d1zj.onrender.com/api |
| **Polygon Explorer** | https://amoy.polygonscan.com/address/0x551049E4bb3eB377db9e24B65b83b226fc3Dc1eA |

---

<!--# 📸 Application Preview

> Replace these placeholders with screenshots after completing the project.

<table>
<tr>
<td align="center"><b>Landing Page</b></td>
<td align="center"><b>Marketplace</b></td>
</tr>

<tr>
<td><img src="docs/landing.png" width="450"/></td>
<td><img src="docs/marketplace.png" width="450"/></td>
</tr>

<tr>
<td align="center"><b>Artisan Dashboard</b></td>
<td align="center"><b>Buyer Dashboard</b></td>
</tr>

<tr>
<td><img src="docs/artisan-dashboard.png" width="450"/></td>
<td><img src="docs/buyer-dashboard.png" width="450"/></td>
</tr>
</table> --!>
