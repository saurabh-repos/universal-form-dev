"use client";
import React, { useRef } from "react";

function FormHeader({ fieldId, selectedFieldId, setSelectedFieldId }) {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  const handleEdit = (ref, placeholder) => {
    if (ref.current.innerText === placeholder) {
      ref.current.innerText = "";
    }
    setTimeout(() => ref.current?.focus(), 0);
  };

  const handleBlur = (ref, placeholder) => {
    if (!ref.current.innerText.trim()) {
      ref.current.innerText = placeholder;
    }
  };

  return (
    <div
      className={`w-[80%] border border-black rounded-2xl p-2 pl-4 min-h-auto space-y-2 ${
        selectedFieldId === fieldId ? "border-black border-2" : ""
      }`}
      onClick={() => setSelectedFieldId(fieldId)}
    >
      <p
        ref={titleRef}
        contentEditable
        suppressContentEditableWarning
        className="text-2xl font-bold text-black break-words outline-none w-full"
        onFocus={() => handleEdit(titleRef, "Untitled Form")}
        onBlur={() => handleBlur(titleRef, "Untitled Form")}
      >
        Untitled Form
      </p>
      <p
        ref={descriptionRef}
        contentEditable
        suppressContentEditableWarning
        className="text-sm font-normal text-[#999999] break-words outline-none w-full"
        onFocus={() => handleEdit(descriptionRef, "Form description")}
        onBlur={() => handleBlur(descriptionRef, "Form description")}
      >
        Form description
      </p>
    </div>
  );
}

export default FormHeader;
