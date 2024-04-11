import React from "react";
import merge from "lodash.merge";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import {
  connectorsForWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import {
  injectedWallet,
  metaMaskWallet,
  walletConnectWallet,
  ledgerWallet,
  coinbaseWallet,
  braveWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { optimism, optimismSepolia } from "wagmi/chains";
import type { Chain } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import IndexPage from "./pages/Index";
import ErrorPage from "./pages/Error";
import Header from "./components/Header";
import { AlloContextProvider } from "./context/Allo";
import SuperfluidContextProvider from "./context/Superfluid";
import {
  NETWORK_ID,
  RPC_URL,
  WALLET_CONNECT_PROJECT_ID,
} from "./lib/constants";
import "@rainbow-me/rainbowkit/styles.css";
import "./styles.scss";

const networkIdToChain: Record<number, Chain> = {
  10: optimism,
  11155420: optimismSepolia,
};
const { chains, publicClient } = configureChains(
  [networkIdToChain[NETWORK_ID]],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: RPC_URL,
      }),
    }),
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: "Suggested",
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({ chains, projectId: WALLET_CONNECT_PROJECT_ID }),
      ledgerWallet({ chains, projectId: WALLET_CONNECT_PROJECT_ID }),
      walletConnectWallet({ chains, projectId: WALLET_CONNECT_PROJECT_ID }),
      coinbaseWallet({ appName: "Geo Web Cadastre", chains }),
      braveWallet({ chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors,
  publicClient,
});

export default function App() {
  const myTheme = merge(darkTheme(), {
    colors: {
      modalBackground: "#202333",
      accentColor: "#2fc1c1",
      modalBorder: "0",
      profileForeground: "#111320",
      modalText: "#f8f9fa",
      closeButtonBackground: "#111320",
      closeButton: "#f8f9fa",
    },
    radii: {
      modal: "18px",
    },
  });

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Header />} errorElement={<ErrorPage />}>
        <Route index element={<IndexPage />} errorElement={<ErrorPage />} />
      </Route>
    )
  );

  const apolloClient = new ApolloClient({
    uri:
      import.meta.env.MODE === "mainnet"
        ? "https://subgraph-endpoints.superfluid.dev/optimism-mainnet/protocol-v1"
        : "https://subgraph-endpoints.superfluid.dev/optimism-sepolia/protocol-v1",
    cache: new InMemoryCache(),
  });

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} modalSize="compact" theme={myTheme}>
        <ApolloProvider client={apolloClient}>
          <AlloContextProvider>
            <SuperfluidContextProvider>
              <RouterProvider router={router} />
            </SuperfluidContextProvider>
          </AlloContextProvider>
        </ApolloProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
