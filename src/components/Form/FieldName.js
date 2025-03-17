"use client";
import React, { useRef, useState } from "react";
import TextFormatter from "./TextFormatter";
import { useDispatch } from "react-redux";
import { updateForm } from "@/redux/asyncActions/formActions";

function FieldName({ fieldIndex, formId, tag }) {
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [hasText, setHasText] = useState(!!tag.title);
  const dispatch = useDispatch();

  const handleFieldNameEdit = () => {
    setIsEditing(true);
    setTimeout(() => editorRef.current?.focus(), 0);
  };

  const handleBlurChangeFieldName = (e) => {
    if (!containerRef.current.contains(e.relatedTarget)) {
      const text = editorRef.current?.innerText.trim();
      setHasText(text.length > 0);
      setIsEditing(false);
      saveFieldName(text);
    }
  };

  const handleInput = () => {
    const text = editorRef.current?.innerText.trim();
    setHasText(text.length > 0);
  };

  const saveFieldName = (name) => {
    dispatch(updateForm({ id: formId, updates: { [`sections[0].tags[${fieldIndex}].title`]: name } }));
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
    <div ref={containerRef} className="relative pt-2 pl-4">
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
        {hasText ? tag.title : "Field Name"}
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
