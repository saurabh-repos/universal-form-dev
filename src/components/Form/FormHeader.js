"use client";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFormChanges } from "@/redux/store/slices/formSlice";
import { updateForm } from "@/redux/asyncActions/formActions";

function FormHeader({ fieldId, selectedFieldId, setSelectedFieldId }) {
  const dispatch = useDispatch();
  const activeFormId = useSelector((state)=>state.menu.activeFormId);
  const formState = useSelector((state) => state.forms.forms[`${activeFormId}`]);
  const [title, setTitle] = useState(formState?.title || "Untitled Form");
  const [description, setDescription] = useState(formState?.description || "Form description");

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    if (formState) {
      setTitle(formState.title || "Untitled Form");
      setDescription(formState.description || "Form description");
    }
  }, [formState,activeFormId]);

  const handleEdit = (ref) => {
    setTimeout(() => ref.current?.focus(), 0);
  };

  const handleBlur = (field, value) => {
    if (!value.trim()) {
      value = field === "title" ? "Untitled Form" : "Form description";
    }

    dispatch(
      updateForm({ id: fieldId, updates: { [field]: value } })
    );
    dispatch(setFormChanges({ formId: fieldId, hasChanges: true }));
  };

  return (
    <div
      className={`w-[80%] border rounded-2xl p-2 pl-4 min-h-auto space-y-2 ${
        selectedFieldId === fieldId ? "border-black border-2" : "border-gray-300"
      }`}
      onClick={() => setSelectedFieldId(fieldId)}
    >
      <p
        ref={titleRef}
        contentEditable
        suppressContentEditableWarning
        className="text-2xl font-bold text-black break-words outline-none w-full"
        onFocus={() => handleEdit(titleRef)}
        onBlur={() => handleBlur("title", titleRef.current.innerText)}
      >
        {title}
      </p>
      <p
        ref={descriptionRef}
        contentEditable
        suppressContentEditableWarning
        className="text-sm font-normal text-[#999999] break-words outline-none w-full"
        onFocus={() => handleEdit(descriptionRef)}
        onBlur={() => handleBlur("description", descriptionRef.current.innerText)}
      >
        {description}
      </p>
    </div>
  );
}

export default FormHeader;
