"use client";
import React, { useState } from "react";
import { IoIosRadioButtonOff } from "react-icons/io";

function RadioOptionsCreator() {
  const [options, setOptions] = useState([{ id: Date.now(), text: "" }]);

  const handleOptionChange = (id, text) => {
    const updatedOptions = options.map((option) =>
      option.id === id ? { ...option, text } : option
    );
    setOptions(updatedOptions);
  };

  const addOption = () => {
    setOptions([...options, { id: Date.now(), text: "" }]);
  };

  const addOtherOption = () => {
    setOptions([...options, { id: Date.now(), text: "Other" }]);
  };

  return (
    <div className="w-full flex flex-col gap-1">
      {options.map((option) => (
        <div key={option.id} className="flex items-center">
          <IoIosRadioButtonOff className="text-base text-[#999999]" />
          <input
            type="text"
            value={option.text}
            onChange={(e) => handleOptionChange(option.id, e.target.value)}
            className="flex-1 px-2 outline-none rounded-md text-base text-black]"
            placeholder="Option"
          />
        </div>
      ))}
      <div className="flex items-center text-sm gap-2">
        <IoIosRadioButtonOff className="text-base text-[#999999]" />
        <p onClick={addOption} className="flex items-center text-base text-[#999999]">
          Add Option
        </p>
        <p>or</p>
        <p onClick={addOtherOption} className="flex items-center text-base text-[#1C73E8]">
          Add &quot;Other&quot;
        </p>
      </div>
    </div>
  );
}

export default RadioOptionsCreator;
