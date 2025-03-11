import React from "react";
import FieldName from "./FieldName";
import FieldDescription from "./FieldDescription";
import RadioOptionsCreator from "./RadioOptionsCreator";
import FieldToolbar from "./FieldToolbar";
import ShortAnswer from "./FieldType/ShortAnswer";

const FieldCreator = ({ fieldId, selectedFieldId, setSelectedFieldId }) => {
  return (
    <div
      className={`w-[80%] border border-black rounded-2xl max-h-max gap-4 cursor-pointer ${
        selectedFieldId === fieldId ? "border-black border-2" : ""
      }`}
      onClick={() => setSelectedFieldId(fieldId)}
    >
        <FieldName />
        <FieldDescription />
        {/* <RadioOptionsCreator /> */}
        <ShortAnswer/>
      <FieldToolbar />
    </div>
  );
};

export default FieldCreator;
