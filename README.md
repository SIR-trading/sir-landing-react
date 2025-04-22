# SIR.trading landing page
SIR.trading landing page repo

## Environment Variables
The following environment variables are required to be set in a `.env` file in the root of the project:
```dotenv
NUXT_TESTNET_CONTRACT= {Testnet sale contract address}
NUXT_MAINNET_CONTRACT= {Mainnet sale contract address, applies when NUXT_ENV==production}
NUXT_ENV= {Choose from [production, staging, development]. production/development use chainId of 1, and staging is for Sepolia}
NUXT_RPC= {Your RPC entry-point}
NUXT_BUTERIN_CARDS= {Buterin Cards address}
NUXT_MINED_JPEG= {Mined JPEG address}
KV_REST_API_READ_ONLY_TOKEN= {Read-only access token for the KV store}
KV_REST_API_TOKEN= {Read-write access token for the KV store}
KV_REST_API_URL= {URL of the KV store's REST API endpoint}
KV_URL= {Base URL of the KV store}
```
- _The contract addresses are used to interact with the contract on the respective networks_
- _The environment variable is used to determine the network to interact with_


## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
