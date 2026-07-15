# 🧶 LoomLedger
> **Digital Trust Platform for Authentic Handloom Products**

LoomLedger is a corporate-grade, production-ready SaaS + E-commerce platform that combats the handloom forgery crisis. By bridging **Generative AI** storytelling with **Polygon Amoy Blockchain** immutable record registries, the platform establishes verifiable provenance for traditional Indian textiles (e.g. Banarasi Silk, Kanjivaram, Chanderi).

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

* **Framework:** Next.js 15 (App Router) + TypeScript + React 19
* **Styling:** Tailwind CSS v4 (customized heritage HSL token system)
* **Animations:** Framer Motion (micro-animations, state transition cues)
* **Icons:** Lucide Icons
* **State & Queries:** Custom AppContext state provider + TanStack React Query

---

## 🚀 Getting Started

### 1. Installation
Clone the repository and install all dependencies:
```bash
npm install
```

### 2. Local Development
Start the local server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 3. Production Build
Compile the application:
```bash
npm run build
```

---

## 🔑 Demo Account Credentials

You can log in directly using the following credentials:

* **Buyer Workspace:** `buyer1@example.com` / `123456`
* **Artisan Workspace:** `artisan1@example.com` / `123456`
* **Admin Moderator Console:** `admin@example.com` / `123456`

---

## 📂 Project Structure

```text
src/
├── app/                  # Next.js page routers & static templates
│   ├── admin/            # Admin moderation dashboards
│   ├── artisan/          # Artisan profiles & settings subviews
│   ├── buyer/            # Buyer accounts & certificates vault
│   ├── marketplace/      # Verified saree lists & dynamic details
│   ├── stories/          # AI Weaver Chronicles blogs
│   └── verify/           # Provenance validation scanner mockup
├── components/           # Decoupled UI modules and primitives
│   ├── layout/           # Sticky navbars and footers
│   └── ui/               # Reusable Button and Badge elements
├── context/              # Centralized AppContext provider (localStorage sync)
└── data/                 # Mock database profiles & FAQs
```

---

## 📄 License
This project is open-source and developed as part of the Handloom Trust platform initiative.
