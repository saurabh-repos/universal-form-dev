import React, { useEffect, useState } from "react";
import FieldTypeSelect from "./FieldTypeSelect";
import { IoCopyOutline } from "react-icons/io5";
import { BiTrash } from "react-icons/bi";
import ToggleSwitch from "../ToggleSwitch";
import FieldModal from "../FieldModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTag,
  duplicateTag,
  updateTagRequired,
} from "@/redux/store/slices/formSlice";

function FieldToolbar({
  selectedType,
  setSelectedType,
  tagIndex,
  sectionIndex,
  formId,
}) {
  const required = useSelector(
    (state) =>
      state.forms?.tempForms?.[formId]?.sections?.[sectionIndex]?.tags?.[
        tagIndex
      ]?.required
  );
  const dispatch = useDispatch();

  const toggleSwitch = () => {
    dispatch(
      updateTagRequired({ formId, sectionIndex, tagIndex, required: !required })
    );
  };

  const handleDelete = () => {
    dispatch(deleteTag({ formId, sectionIndex, tagIndex }));
  };

  const handleCopy = () => {
    dispatch(duplicateTag({ formId, sectionIndex, tagIndex }));
  };

  return (
    <div className="flex items-center border-t border-black p-2 pl-4">
      <div className="w-[35%]">
        <FieldTypeSelect
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          tagIndex={tagIndex}
          sectionIndex={sectionIndex}
          formId={formId}
        />
      </div>
      <div className="w-[65%] flex items-center justify-end gap-4">
        <div className={`flex items-center gap-2 bg-white`}>
          <span className="text-sm">required</span>
          <ToggleSwitch isOn={required} toggleSwitch={toggleSwitch} />
        </div>
        <div className="border-l border-black h-6"></div>
        <div className="flex items-center gap-2 ml-2">
          <IoCopyOutline
            className="w-6 h-6 cursor-pointer"
            title="Duplicate field"
            onClick={handleCopy}
          />
          <BiTrash
            className="w-6 h-6 cursor-pointer"
            title="Delete field"
            onClick={handleDelete}
          />
          <FieldModal
            tagIndex={tagIndex}
            sectionIndex={sectionIndex}
            formId={formId}
          />
        </div>
      </div>
    </div>
  );
}

export default FieldToolbar;
