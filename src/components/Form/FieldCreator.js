import React, { useState } from "react";
import FieldName from "./FieldName";
import FieldDescription from "./FieldDescription";
import MultipleChoice from "./FieldType/MultipleChoice";
import FieldToolbar from "./FieldToolbar";
import ShortAnswer from "./FieldType/ShortAnswer";
import Checkbox from "./FieldType/Checkbox";
import Dropdown from "./FieldType/Dropdown";
import { fieldTypeOptions } from "@/utils/fieldTypeOptions";

const FieldCreator = ({ fieldIndex, formId, selectedFieldId, setSelectedFieldId, tag }) => {
  const [fieldType, setFieldType] = useState(fieldTypeOptions.find(option => option.value === tag.type) || fieldTypeOptions[2]);

  const renderFieldType = () => {
    switch (fieldType.value) {
      case "multiple_choice":
        return <MultipleChoice />;
      case "checkboxes":
        return <Checkbox />;
      case "dropdown":
        return <Dropdown />;
      case "short_answer":
        return <ShortAnswer />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`w-[80%] border border-black rounded-2xl max-h-max gap-4 cursor-pointer ${
        selectedFieldId === fieldIndex ? "border-black border-2" : ""
      }`}
      onClick={() => setSelectedFieldId(fieldIndex)}
    >
      <FieldName fieldIndex={fieldIndex} formId={formId} tag={tag} />
      <FieldDescription tag={tag} />
      {renderFieldType()}
      <FieldToolbar selectedType={fieldType} setSelectedType={setFieldType} />
    </div>
  );
};

export default FieldCreator;
