"use client";
import React, { useState } from "react";
import InputComp from "../InputComp";
import DatePickerComp from "../DatePickerComp";
import TimePickerComp from "../TimePickerComp";

const ViewField = ({ tag }) => {
  const validationRule = tag?.validation || {};
  const [error, setError] = useState("");
  const [value, setValue] = useState("");

  const validateNumber = (value) => {
    if (!validationRule.condition) return;
    let numValue = parseFloat(value);

    switch (validationRule.condition) {
      case "Greater than":
        if (!(numValue > validationRule.value))
          setError(validationRule.errorMessage || "Number too small");
        else setError("");
        break;
      case "Less Than":
        if (!(numValue < validationRule.value))
          setError(validationRule.errorMessage || "Number too large");
        else setError("");
        break;
      case "Equal to":
        if (numValue !== parseFloat(validationRule.value))
          setError(validationRule.errorMessage || "Must be equal");
        else setError("");
        break;
      case "Is Number":
        if (isNaN(numValue))
          setError(validationRule.errorMessage || "Must be a number");
        else setError("");
        break;
      case "Whole number":
        if (!Number.isInteger(numValue))
          setError(validationRule.errorMessage || "Must be a whole number");
        else setError("");
        break;
      default:
        setError("");
    }
  };

  const handleBlur = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    if (tag?.required && !inputValue) {
      setError("This field is required");
      return;
    }

    if (tag?.type === "short_answer" && validationRule.condition) {
      validateNumber(inputValue);
    }

    // if (onInputChange) {
    //   //   onInputChange(tag._id, inputValue);
    //   console.log(inputValue);
    // }
  };

  return (
    <div className="bg-white shadow-lg w-full px-2 py-4 rounded-lg">
      <label className="block font-medium" htmlFor={`input-${tag.title}`}>
        {tag.title} {tag.required && <span className="text-red-500">*</span>}
      </label>
      {tag?.description && (
        <p className="text-sm text-gray-500">{tag.description}</p>
      )}

      {tag?.type === "short_answer" && (
        <>
          <InputComp
            id={`input-${tag.title}`}
            type="text"
            className="border p-2 w-full rounded mt-1 outline-none"
            onBlur={handleBlur}
            required={tag.required}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </>
      )}

      {tag?.type === "paragraph" && (
        <>
          <InputComp
            id={`input-${tag.title}`}
            type="text"
            className="border p-2 w-full rounded mt-1 outline-none"
            onBlur={handleBlur}
            required={tag.required}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </>
      )}

      {tag?.type === "checkboxes" && tag.options?.length > 0 && (
        <div className="mt-1">
          {tag.options.map((option, idx) => (
            <label
              key={idx}
              className="flex items-center space-x-2"
              htmlFor={`checkbox-${option.value}-${idx}`}
            >
              <InputComp
                id={`checkbox-${option?.value}-${idx}`}
                type="checkbox"
                value={option?.value}
                className="accent-amber-700"
                onBlur={(e) =>
                  handleBlur({ target: { value: e.target.checked } })
                }
                required={tag.required}
              />
              <span>{option?.value}</span>
            </label>
          ))}
        </div>
      )}

      {tag.type === "multiple_choice" && tag.options?.length > 0 && (
        <div className="mt-1">
          {tag.options.map((option, idx) => (
            <label
              key={option?.id}
              className="flex items-center space-x-2"
              htmlFor={`radio-${option?.value}-${idx}`}
            >
              <InputComp
                id={`radio-${option?.value}-${idx}`}
                type="radio"
                name={`radio-group-${tag.id}`}
                value={option?.value}
                className="accent-amber-700"
                onBlur={(e) => handleBlur({ target: { value: option?.value } })}
                required={tag.required}
              />
              <span>{option?.value}</span>
            </label>
          ))}
        </div>
      )}

      {tag.type === "dropdown" && (
        <select
          id={`dropdown-${tag.value}`}
          className="border p-2 w-full rounded mt-1 outline-none"
          required={tag.required}
          onBlur={(e) => handleBlur({ target: { value: e.target.value } })}
        >
          {tag.options.map((option, idx) => (
            <option key={idx} value={option?.value}>
              {option?.value}
            </option>
          ))}
        </select>
      )}

      {tag.type === "file_upload" && (
        <InputComp
          id={`file-${tag.value}`}
          type="file"
          className="p-2 w-full rounded mt-1"
          onBlur={(e) => handleBlur({ target: { value: e.target.files[0] } })}
          required={tag.required}
        />
      )}

      {tag.type === "date" && (
        <DatePickerComp
          required={tag.required}
          onChange={(date) => handleBlur({ target: { value: date } })}
        />
      )}
      {tag.type === "time" && (
        <TimePickerComp
          required={tag.required}
          onChange={(time) => handleBlur({ target: { value: time } })}
        />
      )}
    </div>
  );
};

export default ViewField;
