"use client";

import { StyleProvider } from "@ant-design/cssinjs";
import { ChakraProvider } from "@chakra-ui/react";
import { publicProvider } from "@wagmi/core/providers/public";
import { ConfigProvider } from "antd";
import { WagmiConfig, configureChains, createConfig, mainnet } from "wagmi";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);



// Set up wagmi config
const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: "...",
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});



function Provider({ children }) {
  return (
    <ChakraProvider>
      <WagmiConfig config={config}>
        <ConfigProvider>
          <StyleProvider>{children}</StyleProvider>
        </ConfigProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
}

export default Provider;
