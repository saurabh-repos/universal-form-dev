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

export const validateNumber = (value, validationRule, setError) => {
  if (!validationRule.condition) return;
  let numValue = parseFloat(value);

  switch (validationRule.condition) {
    case "greater_than":
      if (!(numValue > validationRule.value))
        setError(validationRule.errorMessage || "Number too small");
      else setError("");
      break;
    case "greater_than_or_equal":
      if (!(numValue >= validationRule.value))
        setError(
          validationRule.errorMessage ||
            "Number must be greater than or equal to the specified value"
        );
      else setError("");
      break;
    case "less_than":
      if (!(numValue < validationRule.value))
        setError(validationRule.errorMessage || "Number too large");
      else setError("");
      break;
    case "less_than_or_equal":
      if (!(numValue <= validationRule.value))
        setError(
          validationRule.errorMessage ||
            "Number must be less than or equal to the specified value"
        );
      else setError("");
      break;
    case "is_number":
      if (isNaN(numValue))
        setError(validationRule.errorMessage || "Must be a number");
      else setError("");
      break;
    case "whole_number":
      if (!Number.isInteger(numValue) || numValue < 0)
        setError(validationRule.errorMessage || "Must be a whole number");
      else setError("");
      break;
    case "between":
      if (!(numValue >= validationRule.min && numValue <= validationRule.max))
        setError(
          validationRule.errorMessage ||
            `Number must be between ${validationRule.min} and ${validationRule.max}`
        );
      else setError("");
      break;
    case "not_between":
      if (numValue >= validationRule.min && numValue <= validationRule.max)
        setError(
          validationRule.errorMessage ||
            `Number must not be between ${validationRule.min} and ${validationRule.max}`
        );
      else setError("");
      break;
    default:
      setError("");
  }
};

export const validateText = (value, validationRule, setError) => {
  if (!validationRule.condition) return;

  switch (validationRule.condition) {
    case "contains":
      if (!value.includes(validationRule.value))
        setError(
          validationRule.errorMessage || "Text does not contain required value"
        );
      else setError("");
      break;
    case "not_contains":
      if (value.includes(validationRule.value))
        setError(
          validationRule.errorMessage || "Text contains forbidden value"
        );
      else setError("");
      break;
    default:
      setError("");
  }
};

export const validateLength = (value, validationRule, setError) => {
  if (!validationRule.condition) return;
  switch (validationRule.condition) {
    case "min_length":
      if (value.length < validationRule.value)
        setError(validationRule.errorMessage || "Text is too short");
      else setError("");
      break;
    case "max_length":
      if (value.length > validationRule.value)
        setError(validationRule.errorMessage || "Text is too long");
      else setError("");
      break;
    default:
      setError("");
  }
};

export const validateRegex = (value, validationRule, setError) => {
  if (!validationRule.condition) return;
  const regexPattern = validationRule.value.replace(/^\/|\/$/g, "");
  const regex = new RegExp(regexPattern);
  switch (validationRule.condition) {
    case "matches":
      if (!regex.test(value))
        setError(
          validationRule.errorMessage || "Text does not match the pattern"
        );
      else setError("");
      break;
    case "not_matches":
      if (regex.test(value))
        setError(
          validationRule.errorMessage || "Text matches the forbidden pattern"
        );
      else setError("");
      break;
    default:
      setError("");
  }
};
