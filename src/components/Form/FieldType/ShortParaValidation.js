import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomSelect from "@/components/CustomSelect";

import {
  numberValidations,
  textValidations,
  lengthValidations,
  regexValidations,
} from "@/utils/validationOptions";
import { updateTagValidation } from "@/redux/store/slices/formSlice";

const validationCategories = [
  { label: "Number", value: "number" },
  { label: "Text", value: "text" },
  { label: "Length", value: "length" },
  { label: "Regex", value: "regex" },
];

function ShortParaValidation({ tagIndex, sectionIndex, formId }) {
  const dispatch = useDispatch();

  // Get the form state from Redux
  const tagData = useSelector(
    (state) =>
      state.forms.tempForms?.[formId]?.sections?.[sectionIndex]?.tags?.[
        tagIndex
      ]
  );

  const [selectedCategory, setSelectedCategory] = useState(
    validationCategories.find(
      (cat) => cat.value === tagData?.validation?.type
    ) || validationCategories[0]
  );

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

  const [selectedRule, setSelectedRule] = useState(
    getValidationRules(selectedCategory).find(
      (rule) => rule.value === tagData?.validation?.condition
    ) || getValidationRules(selectedCategory)[0]
  );

  const [validationValues, setValidationValues] = useState({
    value: tagData?.validation?.value || "",
    min: tagData?.validation?.min || "",
    max: tagData?.validation?.max || "",
    errorMessage: tagData?.validation?.errorMessage || "",
  });

  // Update Redux on state change
  useEffect(() => {
    dispatch(
      updateTagValidation({
        formId,
        sectionIndex,
        tagIndex,
        validation: {
          type: selectedCategory.value,
          condition: selectedRule?.value,
          ...validationValues,
        },
      })
    );
  }, [selectedCategory, selectedRule, validationValues, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValidationValues((prev) => ({
      ...prev,
      [name]: value,
    }));
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
            setValidationValues({
              value: "",
              min: "",
              max: "",
              errorMessage: "",
            });
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

        {["between", "not_between"].includes(selectedRule?.value) ? (
          <div className="text-sm flex-1 flex gap-2">
            <input
              type="number"
              name="min"
              placeholder="Min"
              value={validationValues.min}
              onChange={handleInputChange}
              className="w-1/2 outline-none border-b border-[#999999]"
            />
            <input
              type="number"
              name="max"
              placeholder="Max"
              value={validationValues.max}
              onChange={handleInputChange}
              className="w-1/2 outline-none border-b border-[#999999]"
            />
          </div>
        ) : selectedRule?.value === "is_number" ? null : (
          <input
            type={selectedCategory?.value === "number" ? "number" : "text"}
            name="value"
            placeholder={
              selectedCategory?.value === "regex"
                ? "Enter pattern"
                : "Enter value"
            }
            value={validationValues.value}
            onChange={handleInputChange}
            className="w-full outline-none border-b border-[#999999]"
          />
        )}
      </div>

      <div className="w-[26%] text-sm">
        <input
          type="text"
          name="errorMessage"
          placeholder="Custom error message"
          value={validationValues.errorMessage}
          onChange={handleInputChange}
          className="w-full outline-none border-b border-[#999999]"
        />
      </div>
    </div>
  );
}

export default ShortParaValidation;
