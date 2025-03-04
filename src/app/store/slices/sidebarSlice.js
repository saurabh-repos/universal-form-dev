import { SIDEBAR_ITEMS } from "@/constants/menuConstants";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  forms: SIDEBAR_ITEMS,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    addForm: (state) => {
      const newForm = {
        id: state.forms.length + 1,
        label: `Untitled ${state.forms.length + 1}`,
        path: `/forms/untitled-${state.forms.length + 1}`,
        subItems: [
          { id: 1, label: "Header", icon: "📌", action: "headerAction" },
          { id: 2, label: "Publish", icon: "🚀", action: "publishAction" },
          { id: 3, label: "Delete", icon: "🗑️", action: "deleteAction" },
        ],
        isExpanded: false,
      };
      state.forms.push(newForm);
    },
    toggleSubItems: (state, action) => {
      const form = state.forms.find((f) => f.id === action.payload);
      if (form) {
        form.isExpanded = !form.isExpanded;
      }
    },
  },
});

export const { addForm, toggleSubItems } = sidebarSlice.actions;
export default sidebarSlice.reducer;
