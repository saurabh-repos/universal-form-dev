import { userRequest } from "@/lib/requestMethod";
import { createAsyncThunk } from "@reduxjs/toolkit";

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
        const response = await userRequest.post("/admin/createForm", newForm);
        return response.data;
      } catch (error) {
        return rejectWithValue("Failed to create form.");
      }
    }
  );
  
  // Update Form
  export const updateForm = createAsyncThunk(
    "form/updateForm",
    async ({ id, updates }, { rejectWithValue }) => {
      try {
        const response = await userRequest.put(`/admin/updateForm?id=${id}`, updates);
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
        await userRequest.delete(`/api/forms/${formId}`);
        return formId;
      } catch (error) {
        return rejectWithValue("Failed to delete form.");
      }
    }
  );