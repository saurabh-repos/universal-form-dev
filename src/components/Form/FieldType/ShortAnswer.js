import React from "react";
import ShortParaValidation from "./ShortParaValidation";
import { useSelector } from "react-redux";

function ShortAnswer({ tagIndex, sectionIndex, formId }) {
  const inputValidation = useSelector(
    (state) =>
      state.forms?.tempForms?.[formId]?.sections?.[sectionIndex]?.tags?.[
        tagIndex
      ].inputValidation
  );

  return (
    <div className="py-2">
      <p className="text-sm text-black pl-4">Short Answer Text</p>
      <div className="py-1">
        {inputValidation && (
          <ShortParaValidation
            tagIndex={tagIndex}
            sectionIndex={sectionIndex}
            formId={formId}
          />
        )}
      </div>
    </div>
  );
}

export default ShortAnswer;
