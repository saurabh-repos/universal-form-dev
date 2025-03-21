import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
const ShortParaValidation = lazy(() => import("./ShortParaValidation"));

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
          <Suspense fallback={<p>Loading...</p>}>
            <ShortParaValidation
              tagIndex={tagIndex}
              sectionIndex={sectionIndex}
              formId={formId}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default ShortAnswer;
