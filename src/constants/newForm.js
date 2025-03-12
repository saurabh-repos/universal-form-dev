const defaultValidation = {
  type: "",
  condition: "",
  value: "",
  min: "",
  max: "",
  errorMessage: "",
};

export const newForm = {
  title: "Untitled",
  description: "",
  bgColor: "#FFFFFF",
  font: "Arial",
  sections: [
    {
      title: "New Page",
      description: "",
      tags: [
        {
          title: "",
          description: "",
          type: "input",
          options: [],
          required: false,
          validation: { ...defaultValidation },
        },
      ],
    },
  ],
};
