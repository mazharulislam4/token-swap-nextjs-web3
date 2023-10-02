"use client";

import { SettingOutlined, SwapOutlined } from "@ant-design/icons";
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
        >
          Swap
        </button>
      </div>
    </main>
  );
}
