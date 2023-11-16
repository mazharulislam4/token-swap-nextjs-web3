"use client";

import { useConnectWallet } from "@/context/connectWalletProvider";
import { Button } from "antd/es/radio";
import Link from "next/link";
import { useState } from "react";
import { useConnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";


function Navbar() {
  const { connectAsync } = useConnect();
  const [connectAddress, setConnectAddress] = useState(null);
  const { connectWallet } = useConnectWallet();

  


  const walletConnectHandler = async () => {
    try {
      const { account, chain } = await connectAsync({
        connector: new MetaMaskConnector(),
      });

      setConnectAddress(account);
      connectWallet(account);
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <div className="flex border-b border-slate-200 justify-between py-4  px-8 items-center ">
      {/* logo  */}
      <div>
        <h3>SWAP</h3>
      </div>
      {/* nav  */}
      <nav className="list-unstyled">
        <ul className="flex gap-6">
          {/* home  */}
          <li>
            <Link href={"/"}>Swap</Link>
          </li>
          {/* home  */}
          <li>
            <Link href={"/tokens"}>Tokens</Link>
          </li>
        </ul>
      </nav>

      {/* button  */}
      <div>
        {connectAddress ? (
          connectAddress
        ) : (
          <Button type="primary" onClick={walletConnectHandler}>
            Connect
          </Button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
