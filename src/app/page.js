"use client";

import { useConnectWallet } from "@/context/connectWalletProvider";
import { SettingOutlined, SwapOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import tokenList from "../tokenList.";
import Dropdown from "./compnents/dropdown/Dropdown";

export default function Home() {
  const [selectedToken1, setSelected1Token] = useState(tokenList[0]);
  const [selectedToken2, setSelected2Token] = useState(tokenList[1]);
  const [counter, setCounter] = useState(0);
  const [takerInput, setTakerInput] = useState("0.0");
  const [makerInput, setMakerInput] = useState("0.0");
  const [convertedToken, setConvertedToken] = useState(0);
  const { address } = useConnectWallet();
  const [txDetails, setTxDetails] = useState(null);

  // token price

  useEffect(() => {
    if (selectedToken1 && selectedToken2 && parseFloat(makerInput) > 0) {
      (async () => {
        const res = await fetch(
          `api/tokenPrice?address=${selectedToken1?.address}&address2=${selectedToken2?.address}`
        );

        const data = await res.json();

        if (data?.address) {
          setTakerInput((data?.ratio * parseFloat(makerInput)).toFixed(2));
        }
      })();
    }
  }, [selectedToken1, selectedToken2, takerInput, makerInput]);

  const onSwitchClick = () => {
    if (counter === 0) {
      setSelected1Token(selectedToken2);
      setSelected2Token(selectedToken1);
      setCounter((prev) => prev + 1);
    }
    if (counter === 1) {
      setSelected1Token(selectedToken1);
      setSelected2Token(selectedToken2);
      setCounter(0);
    }
  };

  const onToken1ChangeHandler = (token) => {
    setSelected1Token(token);
  };

  const onToken2ChangeHandler = (token) => {
    setSelected2Token(token);
  };

  const takerInputChangeHandler = (e) => {
    setTakerInput(e.target.value);
  };

  const makerInputChangeHandler = (e) => {
    setMakerInput(e.target.value);
    if (!e.target.value) {
      setTakerInput("0.0");
    }
  };

  // swap submit handler

  const onSwapHandler = async () => {
    try {
      if (
        takerInput === "0.0" ||
        makerInput === "0.0" ||
        !selectedToken1 ||
        !selectedToken2 ||
        !address
      )
        return;

      const res = await axios.get(
        `api/allowance?tokenAddress=${selectedToken1?.address}&walletAddress=${address}`
      );

      if (res?.data?.data?.allowance == 0) {
        const res2 = await axios.get(
          `api/approve?tokenAddress=${selectedToken1?.address}`
        );
        setTxDetails(res2);

        const swapRes = await fetch(
          `api/_swap?src=${selectedToken1.address}&dst=${
            selectedToken2.address
          }&swapAmount=${String(
            Number(makerInput) * 10 ** selectedToken1.decimals
          )}&fromWallet=${address}`
        );

        console.log(`swap`, swapRes);

        console.log(res2);
      }
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <main className="">
      {/* swap box  */}
      <div className="bg-white shadow-md max-w-[500px] mt-[50px] mx-auto px-3 py-2 rounded-md">
        <div className="flex justify-between items-center ">
          <h2>Swap</h2>
          <span className="text-[1.3rem]">
            <SettingOutlined />
          </span>
        </div>

        {/* body  */}
        <div className="relative mt-4">
          {/* top dropdown  */}
          <div className="bg-slate-200 px-3   flex justify-between items-center">
            <input
              type="text"
              name="maker"
              value={makerInput}
              className="bg-transparent  focus:outline-none  py-8"
              onChange={makerInputChangeHandler}
            />

            <div>
              <Dropdown
                initialSelect={selectedToken1}
                onChange={onToken1ChangeHandler}
              />
            </div>
          </div>

          {/* swap button  */}

          <button
            type="button"
            className="mx-auto  absolute w-[40px] h-[40px] rounded-lg flex justify-center top-[50%] transform translate-y-[-50%] left-[50%] translate-x-[-50%] items-center bg-slate-300 outline outline-[3px] outline-white"
            onClick={onSwitchClick}
          >
            <SwapOutlined />
          </button>

          {/* bottom dropdown  */}

          <div className="bg-slate-200 px-3  mt-[10px] flex justify-between items-center">
            <input
              type="text"
              name="taker"
              value={takerInput}
              className="bg-transparent  focus:outline-none  py-8"
              onChange={takerInputChangeHandler}
              readOnly
            />

            <div>
              <Dropdown
                initialSelect={selectedToken2}
                onChange={onToken2ChangeHandler}
              />
            </div>
          </div>
        </div>

        {/* swap button  */}
        <button
          type="button"
          className="w-full bg-slate-400 text-white py-3 text-center rounded-md mt-4"
          onClick={onSwapHandler}
        >
          Swap
        </button>
      </div>
    </main>
  );
}
