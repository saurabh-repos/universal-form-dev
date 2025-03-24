export const validationCategories = [
  { label: "Number", value: "number" },
  { label: "Text", value: "text" },
  { label: "Length", value: "length" },
  { label: "Regex", value: "regex" },
];


export const numberValidations = [
    { label: "Is number", value: "is_number" },
    { label: "Whole number", value: "whole_number" },
    { label: "Greater than", value: "greater_than" },
    { label: "Greater than or equal to", value: "greater_than_or_equal" },
    { label: "Less than", value: "less_than" },
    { label: "Less than or equal to", value: "less_than_or_equal" },
    { label: "Between", value: "between" },
    { label: "Not between", value: "not_between" },
  ];
  
  export const textValidations = [
    { label: "Contains", value: "contains" },
    { label: "Does not contain", value: "not_contains" },
  ];
  
  export const lengthValidations = [
    { label: "Minimum character count", value: "min_length" },
    { label: "Maximum character count", value: "max_length" },
  ];
  
  export const regexValidations = [
    { label: "Matches", value: "matches" },
    { label: "Doesn't match", value: "not_matches" },
    { label: "Contains", value: "contains" },
    { label: "Doesn't contain", value: "not_contains" },
  ];
  