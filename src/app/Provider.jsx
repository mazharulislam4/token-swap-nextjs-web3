"use client";

import { ConnectWalletProvider } from "@/context/connectWalletProvider";
import { StyleProvider } from "@ant-design/cssinjs";
import { ChakraProvider } from "@chakra-ui/react";
import { publicProvider } from "@wagmi/core/providers/public";
import { ConfigProvider } from "antd";
import { WagmiConfig, configureChains, createConfig, mainnet } from "wagmi";


const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);



// Set up wagmi config
const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});



function Provider({ children }) {
  return (
    <ChakraProvider>
      <WagmiConfig config={config}>
        <ConfigProvider>
          <ConnectWalletProvider>
            <StyleProvider>{children}</StyleProvider>
          </ConnectWalletProvider>
        </ConfigProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
}

export default Provider;
