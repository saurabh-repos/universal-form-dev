import { userRequest } from "@/lib/requestMethod";
import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Fetch Forms
export const fetchForms = createAsyncThunk(
  "form/fetchForms",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userRequest.get("/admin/getUniversalForms");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch forms.");
    }
  }
);

// Create Form
export const createForm = createAsyncThunk(
  "form/createForm",
  async (newForm, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://form-product.onrender.com/api/v1/admin/createForm", newForm);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to create form.");
    }
  }
);

// Update Form
export const updateFormDetails = createAsyncThunk(
  "form/updateForm",
  async ({ formId, updates }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/forms/${formId}`, updates);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to update form.");
    }
  }
);

// Delete Form
export const deleteForm = createAsyncThunk(
  "form/deleteForm",
  async (formId, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/forms/${formId}`);
      return formId;
    } catch (error) {
      return rejectWithValue("Failed to delete form.");
    }
  }
);

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
        toast.error(action.payload);
      })

      // Create Form
      .addCase(createForm.pending, (state) => {
        state.isLoading = true;
        toast.info("Saving form...");
      })
      .addCase(createForm.fulfilled, (state,action) => {
        state.isLoading = false;
        console.log(action.payload)
        state.forms[action.payload.data._id] = action.payload.data;
        toast.success("Form created successfully!");
      })
      .addCase(createForm.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload || "Error creating form.");
      })

      // Update Form
      .addCase(updateFormDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFormDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.forms[action.payload.id] = action.payload;
        toast.success("Form updated successfully!");
      })
      .addCase(updateFormDetails.rejected, (state, action) => {
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

// Selector to get forms as an array
export const selectForms = (state) => state.form.forms;
export const selectFormsArray = createSelector([selectForms], (forms) =>
  Object.values(forms)
);

export default formSlice.reducer;
