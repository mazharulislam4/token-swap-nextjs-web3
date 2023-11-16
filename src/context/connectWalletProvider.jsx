import { createContext, useContext, useState } from "react";

const Context = createContext({});

export const useConnectWallet = () => useContext(Context);

export const ConnectWalletProvider = ({ children }) => {
  const [address, setAddress] = useState(null);

  const connectWallet = (addss) => {
    setAddress(addss);
  };

  return (
    <Context.Provider value={{ address, connectWallet }}>
      {children}
    </Context.Provider>
  );
};
