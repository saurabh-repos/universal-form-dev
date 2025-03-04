import { SIDEBAR_ITEMS } from "@/constants/menuConstants";
import { createSlice } from "@reduxjs/toolkit";
import { PiFlagBanner } from "react-icons/pi";
import { FiSend } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

const initialState = {
  forms: SIDEBAR_ITEMS,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    addForm: (state) => {
      state.forms.forEach((form) => {
        form.isExpanded = false;
      });
      const newForm = {
        id: state.forms.length - 1 + 1,
        menuId: state.forms.length - 1 + 1,
        label: `Untitled ${state.forms.length + 1}`,
        subItems: [
      { id: 1, label: "Header", icon: <PiFlagBanner />, action: "headerAction" },
      { id: 2, label: "Publish Changes", icon:<FiSend />, action: "publishAction" },
      { id: 3, label: "Delete", icon: <RiDeleteBin6Line />, action: "deleteAction" },
        ],
        isExpanded: true,
        editMode: false,
      };
      state.forms.push(newForm);
    },
    toggleSubItems: (state, action) => {
      const targetFormId = action.payload;
      state.forms.forEach((form) => {
        if (form.id === targetFormId) {
          form.isExpanded = !form.isExpanded;
        } else {
          form.isExpanded = false;
        }
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

export const { addForm, toggleSubItems,setEditMode, updateFormLabel } = sidebarSlice.actions;
export default sidebarSlice.reducer;
