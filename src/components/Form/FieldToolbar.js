import React from "react";
import FieldTypeSelect from "./FieldTypeSelect";
import { IoCopyOutline } from "react-icons/io5";
import { BiTrash } from "react-icons/bi";
import ToggleSwitch from "../ToggleSwitch";
import FieldModal from "../FieldModal";

function FieldToolbar({selectedType, setSelectedType }) {
  return (
    <div className="flex items-center border-t border-black p-2 pl-4">
      <div className="w-[35%]">
        <FieldTypeSelect selectedType={selectedType} setSelectedType={setSelectedType} />
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
          <FieldModal />
        </div>
      </div>
    </div>
  );
}

export default FieldToolbar;
