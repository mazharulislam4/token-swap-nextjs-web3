/* eslint-disable @next/next/no-img-element */
"use client";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown as DropDown, Space } from "antd";
import tokenList from "../../../tokenList.";
import Items from "./Items";
import "./dropdown.css";


function Dropdown({initialSelect = {} , onChange , }) {



  const onItemClickHandler = (token) => {
    onChange(token)
  };

  const items = tokenList?.map((token, index) => ({
    key: index + 1,
    label: <Items key={index} data={token} onClick={()=>{onItemClickHandler(token)}} />,
  }));





  return (
    <DropDown
      menu={{
        items,
        selectable: true,
      }}
      placement="bottomRight"
    >
      <div className="bg-slate-300  w-fit flex items-center gap-2 px-2 py-2 rounded-sm ">
        <img
          src={initialSelect?.img}
          alt="token image"
          width={20}
          height={20}
        />
        <p>{initialSelect?.ticker}</p>

        <Space>
          <DownOutlined />
        </Space>
      </div>
    </DropDown>
  );
}

export default Dropdown;
