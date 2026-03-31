# ProofChain

[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> **Prove Ownership of Your Digital Work.** A decentralized platform to verify and protect your digital files using blockchain technology.

ProofChain empowers digital creators by providing a secure, immutable, and transparent way to verify the authenticity and ownership of their digital assets.

---

## ✨ Features

### 🔐 Immutable Verification
- **Cryptographic Hashing**: Every file receives a unique fingerprint.
- **Blockchain Anchoring**: Hashes are permanently recorded on an immutable ledger.
- **Instant Proof**: Verify any file's authenticity in seconds.

### 📜 Decentralized Licensing
- **License Management**: Create and manage customizable licensing terms for your work.
- **Automated Requests**: Seamlessly handle license requests within the platform.
- **Monetization**: Clear pathways for creators to earn from their verified assets.

### 🖥️ Premium User Experience
- **Interactive Dashboard**: Real-time overview of your assets, licenses, and recent activities.
- **Advanced Explorer**: Functional filters and sorting for finding verified licenses.
- **Operations Terminal**: A powerful, command-like interface for managing technical operations.
- **Responsive & Modern Design**: A high-end dark mode interface featuring glassmorphism and smooth micro-animations.

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/) (with TypeScript)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- `npm` or `pnpm` (highly recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ProofChain.git
   cd ProofChain/ProofChain-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root of the frontend directory and configure your backend API URL:
   ```env
   VITE_API_BASE_URL=http://your-backend-api-url
   ```

4. **Launch the development server**
   ```bash
   npm run dev
   ```

---

## 📂 Project Structure

```bash
src/
├── api/          # API client and endpoint definitions
├── assets/       # Static assets like images and icons
├── components/   # Reusable UI components (layout, dashboard, ui)
├── features/     # Feature-specific logic and components
├── hooks/        # Custom React hooks (auth, licenses, etc.)
├── layouts/      # Page layouts (MainLayout, AuthLayout)
├── mocks/        # Mock data for offline development/prototyping
├── pages/        # Individual page components
├── services/     # Business logic and external service interaction
├── store/        # Zustand state management stores
├── types/        # TypeScript type and interface definitions
└── utils/        # Generic utility functions
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<p align="center">Built with ❤️ for Digital Creators.</p>
