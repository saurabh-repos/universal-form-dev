import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import { MdOutlineTextFields } from "react-icons/md";
import { ImPageBreak } from "react-icons/im";

function FormTools({ addField }) {
  return (
    <div className="w-[9%] h-8 flex items-center justify-center border border-black rounded-xl gap-2">
      <CiCirclePlus onClick={addField} />
      <MdOutlineTextFields />
      <ImPageBreak />
    </div>
  );
}

export default FormTools;
