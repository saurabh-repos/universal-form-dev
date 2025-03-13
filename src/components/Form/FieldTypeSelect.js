"use client";
import React, { useState } from "react";
import CustomSelect from "../CustomSelect";
import { fieldTypeOptions } from "@/utils/fieldTypeOptions";

function FieldTypeSelect({selectedType, setSelectedType}) {
  // const [selectedType, setSelectedType] = useState(fieldTypeOptions[2]);

  return (
    <div className="relative w-full">
      <CustomSelect
        options={fieldTypeOptions}
        selected={selectedType}
        onSelect={setSelectedType}
        maxHeight={280}
        maxWidth={180}
      />
    </div>
  );
}

export default FieldTypeSelect;
