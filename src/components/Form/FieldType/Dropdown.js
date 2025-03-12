"use client";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";

function Dropdown() {
  const [options, setOptions] = useState([{ id: Date.now(), text: "" }]);

  const handleOptionChange = (id, text) => {
    setOptions(options.map((option) => (option.id === id ? { ...option, text } : option)));
  };

  const addOption = () => {
    setOptions([...options, { id: Date.now(), text: "" }]);
  };

  const addOtherOption = () => {
    setOptions([...options, { id: Date.now(), text: "Other" }]);
  };

  const removeOption = (id) => {
    setOptions(options.filter((option) => option.id !== id));
  };

  return (
    <div className="w-full flex flex-col gap-1 pl-4">
      {options.map((option) => (
        <div key={option.id} className="flex items-center">
          <input
            type="text"
            value={option.text}
            onChange={(e) => handleOptionChange(option.id, e.target.value)}
            className="flex-1 px-2 outline-none rounded-md text-base text-black"
            placeholder="Option"
          />
          <div className="w-[4%] cursor-pointer" onClick={() => removeOption(option.id)}>
            <RxCross2 className="text-[#999999]" />
          </div>
        </div>
      ))}

      <div className="flex items-center text-sm gap-2">
        <p onClick={addOption} className="cursor-pointer text-base text-[#999999]">Add Option</p>
        <p>or</p>
        <p onClick={addOtherOption} className="cursor-pointer text-base text-[#1C73E8]">Add &quot;Other&quot;</p>
      </div>
    </div>
  );
}

export default Dropdown;
