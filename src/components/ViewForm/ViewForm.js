import React from "react";
import ViewField from "./ViewField";

const ViewForm = ({ form }) => {
  return (
    // <div style={{ backgroundColor: form.properties.bgColor, fontFamily: form.properties.font, color: form.properties.color }}>
    <div>
      <h1>{form.title}</h1>
      <p>{form.description}</p>
      {form.sections.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          <h2>{section.title}</h2>
          <p>{section.description}</p>
          {section.tags.map((tag, tagIndex) => (
            <ViewField
              key={tagIndex}
              tag={tag}
              tagIndex={tagIndex}
              //   onInputChange={onInputChange}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ViewForm;
