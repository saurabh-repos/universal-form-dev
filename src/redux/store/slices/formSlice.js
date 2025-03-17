import {
  createForm,
  deleteForm,
  fetchForms,
  updateForm,
} from "@/redux/asyncActions/formActions";
import { createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";

const initialState = {
  forms: {},
  isLoading: false,
  error: null,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Forms
      .addCase(fetchForms.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchForms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.forms = action.payload.reduce((acc, form) => {
          acc[form._id] = form;
          return acc;
        }, {});
      })
      .addCase(fetchForms.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload || "Something went wrong.");
      })

      // Create Form
      .addCase(createForm.pending, (state) => {
        state.isLoading = true;
        toast.info("Saving form...");
      })
      .addCase(createForm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.forms[action.payload.data._id] = action.payload.data;
        toast.success("Form created successfully!");
      })
      .addCase(createForm.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload || "Error creating form.");
      })

      // Update Form
      .addCase(updateForm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateForm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.forms[action.payload.data._id] = action.payload.data;
        toast.success("Form updated successfully!");
      })
      .addCase(updateForm.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload || "Error updating form.");
      })

      // Delete Form
      .addCase(deleteForm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteForm.fulfilled, (state, action) => {
        state.isLoading = false;
        delete state.forms[action.payload];
        toast.success("Form deleted successfully!");
      })
      .addCase(deleteForm.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload || "Error deleting form.");
      });
  },
});

export default formSlice.reducer;
