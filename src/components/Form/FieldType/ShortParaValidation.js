import React, { useState } from "react";
import CustomSelect from "@/components/CustomSelect";
import {
  numberValidations,
  textValidations,
  lengthValidations,
  regexValidations,
} from "@/utils/validationOptions";
import { RxCross2 } from "react-icons/rx";

const validationCategories = [
  { label: "Number", value: "number" },
  { label: "Text", value: "text" },
  { label: "Length", value: "length" },
  { label: "Regex", value: "regex" },
];

function ShortParaValidation() {
  const [selectedCategory, setSelectedCategory] = useState(validationCategories[0]);

  const getValidationRules = (category) => {
    switch (category?.value) {
      case "number":
        return numberValidations;
      case "text":
        return textValidations;
      case "length":
        return lengthValidations;
      case "regex":
        return regexValidations;
      default:
        return [];
    }
  };

  const [selectedRule, setSelectedRule] = useState(getValidationRules(selectedCategory)[0]);

  const [inputValues, setInputValues] = useState(["", ""]);
  const [customError, setCustomError] = useState("");

  const getPlaceholderText = () => {
    switch (selectedCategory?.value) {
      case "number":
        return "number";
      case "text":
        return "text";
      case "length":
        return "number";
      case "regex":
        return "pattern";
      default:
        return "";
    }
  };

  const handleInputChange = (index, value) => {
    const updatedValues = [...inputValues];
    updatedValues[index] = value;
    setInputValues(updatedValues);
  };

  return (
    <div className="flex flex-wrap items-center gap-4 border-t-2 border-dashed border-black box-border p-4">
      <div className="w-[18%] text-sm">
        <CustomSelect
          options={validationCategories}
          selected={selectedCategory}
          onSelect={(value) => {
            setSelectedCategory(value);
            const newRules = getValidationRules(value);
            setSelectedRule(newRules[0] || null);
            setInputValues(["", ""]);
          }}
          maxHeight={280}
          maxWidth={180}
        />
      </div>

      <div className="w-[44%] flex items-center gap-4">
      <div className="text-sm min-w-[40%]">
        <CustomSelect
          options={getValidationRules(selectedCategory)}
          selected={selectedRule}
          onSelect={setSelectedRule}
          maxHeight={280}
          maxWidth={"100%"}
          disabled={!selectedCategory}
        />
      </div>

      <div className="text-sm flex-1">
        {selectedRule?.value === "between" || selectedRule?.value === "not_between" ? (
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={inputValues[0]}
              onChange={(e) => handleInputChange(0, e.target.value)}
              className="w-1/2 outline-none border-b border-[#999999]"
            />
            <input
              type="number"
              placeholder="Max"
              value={inputValues[1]}
              onChange={(e) => handleInputChange(1, e.target.value)}
              className="w-1/2 outline-none border-b border-[#999999]"
            />
          </div>
        ) : (
          <input
            type={selectedCategory?.value === "number" ? "number" : "text"}
            placeholder={getPlaceholderText()}
            value={inputValues[0]}
            onChange={(e) => handleInputChange(0, e.target.value)}
            className="w-full outline-none border-b border-[#999999]"
          />
        )}
      </div>
      </div>

      <div className="w-[26%] text-sm">
        <input
          type="text"
          placeholder="Custom error message"
          value={customError}
          onChange={(e) => setCustomError(e.target.value)}
          className="w-full outline-none border-b border-[#999999]"
        />
      </div>

      <div className="w-[4%]">
        <RxCross2 className="text-[#999999]" />
      </div>
    </div>
  );
}

export default ShortParaValidation;
