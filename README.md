# ve-interface

Frontend interface for ve-factory built with Next.js, wagmi, and Chakra UI.

## Tech Stack

- **Framework**: Next.js 14
- **Smart Contract Integration**: wagmi v2, viem
- **UI Library**: Chakra UI
- **State Management**: TanStack Query (React Query)
- **Form Management**: Formik
- **Charts**: Chart.js, react-chartjs-2
- **Wallet Connection**: Web3Modal
- **Internationalization**: react-i18next
- **Language**: TypeScript

## Requirements

- Node.js >= 18.17.0
- npm or yarn

## Setup

1. Clone the repository:
```bash
git clone https://github.com/DeFiGeek-Community/ve-interface
cd ve-interface
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Configure environment variables:
Copy `.env.example` to `.env` and set up the following environment variables:

```bash
# Alchemy Project Key
NEXT_PUBLIC_ALCHEMY_ID=your_alchemy_key

# WalletConnect Project ID
NEXT_PUBLIC_PROJECT_ID=your_walletconnect_project_id

# Infura Project ID
NEXT_PUBLIC_INFURA_ID=your_infura_id
```

You can obtain the API keys from:
- Alchemy: https://www.alchemy.com/
- WalletConnect: https://cloud.walletconnect.com/
- Infura: https://www.infura.io/

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Key Features

- ve-token locking mechanism
- Weighted voting system
- Reward tracking and claiming
- Multi-wallet support
- Real-time blockchain data display

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Create production build
- `npm run start`: Start production server
- `npm run lint`: Run ESLint code verification
- `npm run format`: Run Prettier code formatting

## Project Structure

```
ve-interface/
├── components/     # UI Components
├── hooks/         # Custom Hooks
│   ├── ScoreWeightController/ # Score weight controller hooks
│   ├── FeeDistributor/        # Fee distribution hooks
│   ├── Gauge/                 # Gauge related hooks
│   ├── Yamato/                # Yamato protocol hooks
│   ├── Token/                 # Token operation hooks
│   ├── Minter/                # Minter functionality hooks
│   ├── VotingEscrow/          # Voting escrow hooks
│   ├── Vesting/               # Vesting hooks
│   └── useToastNotifications  # Toast notification hooks
├── lib/           # Utilities, Constants, and Contexts
│   ├── constants/ # Contract ABIs, addresses, and configs
│   ├── connector/ # Blockchain connection utilities
│   └── contexts/  # React contexts
├── pages/         # Next.js page components
└── public/        # Static files
```

