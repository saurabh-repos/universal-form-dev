const defaultValidation = {
  type: "",
  condition: "",
  value: "",
  min: "",
  max: "",
  errorMessage: "",
};

export const newTag = {
  title: "",
  description: "",
  type: "short_answer",
  options: [],
  required: false,
  validation: { ...defaultValidation },
};

export const newSection = {
  title: "New Page",
  description: "",
  tags: [ { ...newTag } ],
};

export const newForm = {
  title: "Untitled",
  description: "",
  bgColor: "#FFFFFF",
  font: "Arial",
  sections: [ { ...newSection } ],
};

