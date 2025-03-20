import React, { useState } from "react";
import FieldName from "./FieldName";
import FieldDescription from "./FieldDescription";
import MultipleChoice from "./FieldType/MultipleChoice";
import FieldToolbar from "./FieldToolbar";
import ShortAnswer from "./FieldType/ShortAnswer";
import Checkbox from "./FieldType/Checkbox";
import Dropdown from "./FieldType/Dropdown";
import { fieldTypeOptions } from "@/utils/fieldTypeOptions";
import { useSelector } from "react-redux";

const FieldCreator = ({
  tagIndex,
  sectionIndex,
  formId,
  selectedFieldId,
  setSelectedFieldId,
  tag,
}) => {
  const [fieldType, setFieldType] = useState(
    fieldTypeOptions.find((option) => option.value === tag.type) ||
      fieldTypeOptions[2]
  );
  const descriptionConcent = useSelector(
    (state) =>
      state.forms?.tempForms?.[formId]?.sections?.[sectionIndex]?.tags?.[
        tagIndex
      ].descriptionConcent
  );

  const renderFieldType = () => {
    switch (fieldType.value) {
      case "multiple_choice":
        return (
          <MultipleChoice
            tagIndex={tagIndex}
            sectionIndex={sectionIndex}
            formId={formId}
            tag={tag}
          />
        );
      case "checkboxes":
        return (
          <Checkbox
            tagIndex={tagIndex}
            sectionIndex={sectionIndex}
            formId={formId}
            tag={tag}
          />
        );
      case "dropdown":
        return (
          <Dropdown
            tagIndex={tagIndex}
            sectionIndex={sectionIndex}
            formId={formId}
            tag={tag}
          />
        );
      case "short_answer":
        return (
          <ShortAnswer
            tagIndex={tagIndex}
            sectionIndex={sectionIndex}
            formId={formId}
            tag={tag}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`w-[80%] border border-black rounded-2xl max-h-max gap-4 cursor-pointer ${
        selectedFieldId === tagIndex ? "border-black border-2" : ""
      }`}
      onClick={() => setSelectedFieldId(tagIndex)}
    >
      <FieldName
        tagIndex={tagIndex}
        sectionIndex={sectionIndex}
        formId={formId}
        tag={tag}
      />
      {descriptionConcent && (
        <FieldDescription
          tagIndex={tagIndex}
          sectionIndex={sectionIndex}
          formId={formId}
          tag={tag}
        />
      )}
      {renderFieldType()}
      <FieldToolbar
        selectedType={fieldType}
        setSelectedType={setFieldType}
        tagIndex={tagIndex}
        sectionIndex={sectionIndex}
        formId={formId}
      />
    </div>
  );
};

export default FieldCreator;
