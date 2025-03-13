import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  forms: [],
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setForms: (state, action) => {
      state.forms = action.payload.map((form) => ({
        id: form._id,
        label: form.title,
        isExpanded: false,
        editMode: false,
      }));
    },
    setCreatedForms: (state, action) => {
      state.forms.push({
        id: action.payload._id,
        menuId:0,
        label: action.payload.title,
        isExpanded: false,
        editMode: false,
      });
    },
    toggleSubItems: (state, action) => {
      const targetFormId = action.payload;
      state.forms.forEach((form) => {
        form.isExpanded = form.id === targetFormId ? !form.isExpanded : false;
      });
    },
    setEditMode: (state, action) => {
      const { id, editMode } = action.payload;
      state.forms = state.forms.map((form) =>
        form.id === id ? { ...form, editMode } : form
      );
    },
    updateFormLabel: (state, action) => {
      const { id, label } = action.payload;
      state.forms = state.forms.map((form) =>
        form.id === id ? { ...form, label, editMode: false } : form
      );
    },
  },
});

export const { setForms,setCreatedForms, toggleSubItems, setEditMode, updateFormLabel } =
  sidebarSlice.actions;
export default sidebarSlice.reducer;
