"use client";
import React, { useRef, useState } from "react";
import TextFormatter from "./TextFormatter";

function FieldName() {
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [hasText, setHasText] = useState(false);

  const handleFieldNameEdit = () => {
    setIsEditing(true);
    setTimeout(() => editorRef.current?.focus(), 0);
  };

  const handleBlurChangeFieldName = (e) => {
    if (!containerRef.current.contains(e.relatedTarget)) {
      const text = editorRef.current?.innerText.trim();
      setHasText(text.length > 0);
      setIsEditing(false);
    }
  };

  const handleInput = () => {
    const text = editorRef.current?.innerText.trim();
    setHasText(text.length > 0);
  };

  const applyStyle = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const applyLink = () => {
    const url = prompt("Enter URL:", "https://");
    if (url) {
      applyStyle("createLink", url);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <p
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onBlur={handleBlurChangeFieldName}
        onClick={handleFieldNameEdit}
        onInput={handleInput}
        className={`text-base font-normal w-full outline-none transition-all duration-300 ${
          hasText ? "text-black" : "text-[#999999]"
        }`}
      >
        {hasText ? "" : "Field Name"}
      </p>

      {isEditing && (
        <TextFormatter
          applyBold={() => applyStyle("bold")}
          applyItalic={() => applyStyle("italic")}
          applyUnderline={() => applyStyle("underline")}
          applyLink={applyLink}
          removeFormatting={() => applyStyle("removeFormat")}
        />
      )}

      <style>
        {`
          p a {
            color: blue;
            text-decoration: underline;
          }
          p:empty:before {
            content: "Field Name";
            color: #999999;
          }
        `}
      </style>
    </div>
  );
}

export default FieldName;
