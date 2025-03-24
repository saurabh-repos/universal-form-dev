import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ViewField from "./ViewField";

const ViewForm = ({ form }) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  const handleNext = () => {
    if (currentSectionIndex < form.sections.length - 1) {
      setCurrentSectionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex((prev) => prev - 1);
    }
  };

  const handleInputChange = (fieldId, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    // dispatch(saveFormToServer(formData)); // Uncomment to save to server
    alert("Form submitted successfully!");
  };

  const isLastSection = currentSectionIndex === form.sections.length - 1;
  const isFirstSection = currentSectionIndex === 0;
  const isSingleSection = form.sections.length === 1;

  const currentSection = form.sections[currentSectionIndex];

  return (
    <div>
      <h1>{form.title}</h1>
      <p>{form.description}</p>

      <div>
        <h2>{currentSection.title}</h2>
        <p>{currentSection.description}</p>
        {currentSection.tags.map((tag, tagIndex) => (
          <ViewField
            key={tagIndex}
            tag={tag}
            tagIndex={tagIndex}
            onInputChange={handleInputChange}
          />
        ))}
      </div>

      <div className="flex justify-between mt-4">
        {isSingleSection ? (
          <button
            onClick={handleSubmit}
            className="bg-green-500 px-4 py-2 rounded"
          >
            Submit
          </button>
        ) : (
          <>
            <button
              onClick={handlePrevious}
              disabled={isFirstSection}
              className="bg-gray-400 px-4 py-2 rounded disabled:opacity-50"
            >
              Previous
            </button>

            {isLastSection ? (
              <button
                onClick={handleSubmit}
                className="bg-green-500 px-4 py-2 rounded"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="bg-blue-500 px-4 py-2 rounded"
              >
                Next
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ViewForm;
