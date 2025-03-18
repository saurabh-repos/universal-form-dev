"use client";
import React from "react";
import CustomSelect from "../CustomSelect";
import { fieldTypeOptions } from "@/utils/fieldTypeOptions";
import { useDispatch } from "react-redux";
import { updateTagType } from "@/redux/store/slices/formSlice";


function FieldTypeSelect({ selectedType, setSelectedType, tagIndex, sectionIndex, formId }) {
  const dispatch = useDispatch();

  const handleSelect = (option) => {
    setSelectedType(option);
    dispatch(updateTagType({ formId, sectionIndex, tagIndex, type: option.value })); 
  };

  return (
    <div className="relative w-full">
      <CustomSelect
        options={fieldTypeOptions}
        selected={selectedType}
        onSelect={handleSelect}
        maxHeight={280}
        maxWidth={180}
      />
    </div>
  );
}

export default FieldTypeSelect;
