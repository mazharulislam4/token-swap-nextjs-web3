"use client";

import { Button } from "antd/es/radio";
import Link from "next/link";
import { useConnect } from "wagmi";


function Navbar() {

 const {connect , connectors} = useConnect()

 console.log(connectors);


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
        <Button type="primary">Connect</Button>
      </div>
    </div>
  );
}

export default Navbar;
