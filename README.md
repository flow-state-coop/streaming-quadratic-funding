# Streaming Quadratic Funding

### Getting Started

Start by setting up the local environment variables.

```
cp .env.example .env.local
```

#### RPC URL

Edit `.env.local` to add the RPC URL
```
RPC_URL=your_rpc_url
```

#### Install Dependencies

Install _Node Version 18_ if you don't have it but stay within LTS.

Use yarn to download and install all your dependencies

```
yarn
```

#### Run Project

To run locally

```
yarn dev
```

### Testing

During development cycles you will need Optimism Sepolia ETH. There are two ways to obtain OP Sepolia ETH.

1. Faucet
   Head over to the [Optimism faucets list](https://docs.optimism.io/builders/tools/build/faucets) and enter the address of the wallet you would like to fund.

2. Bridge
   If you already have Sepolia ETH you can use the [Optimism Bridge](https://app.optimism.io/bridge/deposit). Connect you wallet, select the Sepolia testnet and the amount you would like to bridge.

### Branching & Commits

If you'd like to contribute create a branch based on `develop` and make a PR to be merged in `develop`, commits should follow the [Conventional Commits](https://www.conventionalcommits.org) specification.
