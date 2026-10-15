# Mint AMC — Enterprise IT Hardware Maintenance & AMC Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-green?style=flat-square)](https://www.mintamc.com)

**Mint AMC** is a premier multi-vendor Enterprise IT Maintenance and Annual Maintenance Contract (AMC) web platform powered by **CONZEX GLOBAL PRIVATE LIMITED**. 

The platform delivers high-availability IT infrastructure support, server/storage maintenance, network SLAs, and multi-vendor hardware coverage for enterprises, data centers, financial institutions, healthcare providers, and government agencies.

---

## 🚀 Key Features & Highlights

- **Modern Forest Mint Enterprise Aesthetics**: Deep Emerald `#0A3622` primary theme paired with Mint Green accents `#10B981`, sleek card elevation, glassmorphism banners, and responsive layouts.
- **Interactive Navigation & Mega Menus**:
  - **Services Mega Menu**: Multi-category breakdown (Server Maintenance, Storage AMC, Network Hardware, End-User Workspace, 24/7 Enterprise SLAs).
  - **Solutions Mega Menu**: Industry-tailored tracks (Data Center, BFSI High-Availability, Government & Defense, SME Packages, Healthcare Compliance, Remote Operations).
  - **Interactive Quote & Audit Modal**: Built-in modal dialog for instant SLA consultation requests and hardware inventory audits.
- **Dynamic Solutions & Service Routing**:
  - `/services/[slug]`: Deep dive into server, storage, networking, and multi-vendor SLA tiers.
  - `/solutions/[slug]`: Specialized architecture blueprints, SLA commitments, and compliance frameworks per industry.
  - `/resources/[slug]`: Knowledge hub containing SLA selection guides, preventive maintenance checklists, and IT planning whitepapers.
- **Interactive Pricing & Estimator**: Transparent tier matrix, SLA comparison grids, and interactive AMC estimate calculators.
- **Parent Company Integration**: Clear footer branding, legal references, and global corporate backing from **CONZEX GLOBAL PRIVATE LIMITED**.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components & Static Site Generation)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode enabled)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/) with PostCSS & Autoprefixer
- **UI Components**: Custom reusable primitives (`Button`, `FeatureCard`, `Breadcrumbs`, `RequestQuoteModal`, `StickySidebarNav`, `PageHeroBand`)
- **Iconography**: [Lucide React](https://lucide.dev/)
- **Utility Libraries**: `clsx`, `tailwind-merge`

---

## 📁 Repository Structure

```text
mint-amc/
├── src/
│   ├── app/                        # Next.js 14 App Router Pages
│   │   ├── about/                  # About Mint AMC & Conzex Parent Company
│   │   ├── contact/                # Contact, Offices & Emergency Support
│   │   ├── page.tsx                # Homepage Landing & Core Outcomes
│   │   ├── pricing/                # AMC Tiers, Comparison & Estimator
│   │   ├── privacy/                # Privacy Policy & Data Handling
│   │   ├── resources/              # IT Guides & Whitepapers Hub
│   │   ├── services/               # IT Services Overview & [slug] Detail Pages
│   │   ├── sla/                    # Guaranteed Service Level Agreements (SLAs)
│   │   ├── solutions/              # Industry Solutions & [slug] Detail Pages
│   │   ├── terms/                  # Terms of Service & AMC Conditions
│   │   └── why-mint-amc/           # Multi-Vendor Advantages & ROI Analysis
│   ├── components/
│   │   ├── layout/                 # Marketing Chrome, Site Header/Footer, Mega Menus
│   │   └── ui/                     # Buttons, Feature Cards, Modals, Breadcrumbs
│   └── content/                    # Centralized Copy & Structure Definitions
│       ├── about.ts
│       ├── contact.ts
│       ├── legal.ts
│       ├── mega-menu.ts
│       ├── site.ts
│       └── solutions.ts
├── tailwind.config.ts              # Custom Theme Palette & Layout Tokens
└── package.json
```

---

## ⚡ Getting Started

### Prerequisites

- **Node.js**: `v18.17.0` or higher
- **npm**: `v9.0.0` or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/conzex/Mint-AMC.git
   cd Mint-AMC
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3001` in your browser.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts local Next.js dev server on port `3001` |
| `npm run dev:clean` | Clears `.next` cache and starts dev server |
| `npm run build` | Builds optimized production bundle |
| `npm run start` | Runs the production build server on port `3001` |
| `npm run lint` | Runs Next.js ESLint validation |
| `npm run typecheck` | Validates TypeScript types across the codebase |

---

## 🏢 Corporate Ownership & Legal

**Mint AMC** is an enterprise IT services brand operated by **CONZEX GLOBAL PRIVATE LIMITED**.

- **Official Website**: [https://www.mintamc.com](https://www.mintamc.com)
- **GitHub Repository**: [https://github.com/conzex/Mint-AMC](https://github.com/conzex/Mint-AMC)
- **Copyright**: © CONZEX GLOBAL PRIVATE LIMITED. All rights reserved.
