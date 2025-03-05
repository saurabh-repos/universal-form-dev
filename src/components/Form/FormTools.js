import React from "react";
import { CiCirclePlus } from "react-icons/ci"
import { MdOutlineTextFields } from "react-icons/md";
import { ImPageBreak } from "react-icons/im";

function FormTools() {
  return (
    <div className="w-[9%] h-8 flex items-center justify-center border border-black rounded-xl gap-2">
      <CiCirclePlus />
      <MdOutlineTextFields />
      <ImPageBreak />
    </div>
  );
}

export default FormTools;
