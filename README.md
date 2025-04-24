# SIR.trading landing page
SIR.trading landing page repo

## Environment Variables
The following environment variables are required to be set in a `.env` file in the root of the project:

```dotenv
NEXT_PUBLIC_PRESALE_CONTRACT_ADDRESS='{presale contract address}'
NEXT_PUBLIC_CHAIN_ID='{chain id}'
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
