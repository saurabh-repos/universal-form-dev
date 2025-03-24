"use client";
import React, { useState } from "react";
import InputComp from "../InputComp";
import DatePickerComp from "../DatePickerComp";
import TimePickerComp from "../TimePickerComp";
import {
  validateNumber,
  validateText,
  validateLength,
  validateRegex,
} from "../../lib/formValidation";

const ViewField = ({ tag, onInputChange }) => {
  const validationRule = tag?.validation || {};
  const [error, setError] = useState("");
  const [value, setValue] = useState("");

  console.log("tag",tag);
  const handleBlur = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    if (tag?.required && !inputValue) {
      setError("This field is required");
      return;
    }

    switch (tag?.validation?.type) {
      case "number":
        if (validationRule.condition)
          validateNumber(inputValue, validationRule, setError);
        break;
      case "text":
        if (validationRule.condition)
          validateText(inputValue, validationRule, setError);
        break;
      case "length":
        if (validationRule.condition)
          validateLength(inputValue, validationRule, setError);
        break;
      case "regex":
        if (validationRule.condition)
          validateRegex(inputValue, validationRule, setError);
        break;
      default:
        setError("");
    }

    if (onInputChange) {
      onInputChange(tag.title, inputValue);
    }
  };

  console.log("tag.type");
  console.log("tag.type");
  console.log("tag.type");
  console.log("tag.type");
  console.log("tag.type", tag.type);

  console.log("Error:", error);

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
