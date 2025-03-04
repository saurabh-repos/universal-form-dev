export const fetchForms = async () => {
    const response = await fetch('/api/forms');
    return response.json();
  };
  