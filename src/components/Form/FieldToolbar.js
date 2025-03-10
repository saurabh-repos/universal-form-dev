import React from "react";
import FieldTypeSelect from "./FieldTypeSelect";
import { Switch } from "@mui/material";
import { IoCopyOutline } from "react-icons/io5";
import { CiCircleMore } from "react-icons/ci";
import { BiTrash } from "react-icons/bi";
import ToggleSwitch from "../ToggleSwitch";

function FieldToolbar() {
  return (
    <div className="flex items-center">
      <div className="w-[35%]">
        <FieldTypeSelect />
      </div>
      <div className="w-[65%] flex items-center justify-end gap-4">
        <div className="flex items-center gap-2 bg-white">
          <span className="text-sm">required</span>
          <ToggleSwitch />
        </div>
        <div className="border-l border-black h-6"></div>
        <div className="flex items-center gap-2 ml-2">
          <IoCopyOutline className="w-6 h-6 cursor-pointer" />
          <BiTrash className="w-6 h-6 cursor-pointer" />
          <CiCircleMore className="w-6 h-6 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default FieldToolbar;
