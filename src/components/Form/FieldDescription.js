"use client";
import React, { useRef, useState } from "react";
import TextFormatter from "./TextFormatter";

function FieldDescription({ tag }) {
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [hasText, setHasText] = useState(!!tag.description);

  const handleFieldNameEdit = () => {
    setIsEditing(true);
    setTimeout(() => editorRef.current?.focus(), 0);
  };

  const handleBlurChangeFieldName = (e) => {
    if (!containerRef.current.contains(e.relatedTarget)) {
      const text = editorRef.current?.innerText.trim();
      setHasText(text.length > 0);
      if (!text.length) {
        editorRef.current.innerHTML = ""; // Ensure it's truly empty
      }
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
    <div ref={containerRef} className="relative pl-4">
      <p
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onBlur={handleBlurChangeFieldName}
        onClick={handleFieldNameEdit}
        onInput={handleInput}
        data-placeholder="Field Description"
        className={`text-base font-normal w-full outline-none transition-all duration-300 relative ${
          hasText ? "text-black" : "text-[#999999]"
        }`}
      >
        {tag.description || ""}
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
          p[data-placeholder]:empty:before {
            content: attr(data-placeholder);
            color: #999999;
            pointer-events: none;
          }
        `}
      </style>
    </div>
  );
}

export default FieldDescription;
