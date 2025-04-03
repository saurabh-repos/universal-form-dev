import { userRequest } from "@/lib/requestMethod";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Fetch Hierarchy
export const fetchHierarchy = createAsyncThunk(
  "hierarchy/fetchHierarchy",
  async (id, { rejectWithValue }) => {
    try {
      const response = await userRequest.get(
        `/user/getHierarchyByFormId?id=${id}`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch forms.");
    }
  }
);

// Create Hierarchy
export const createHierarchy = createAsyncThunk(
  "hierarchy/createHierarchy",
  async (newHierarchy, { rejectWithValue }) => {
    try {
      const response = await userRequest.post("/user/createHierarchy", newHierarchy);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to create hierarchy.");
    }
  }
);

// Update Hierarchy
export const updateHierarchy = createAsyncThunk(
  "hierarchy/updateHierarchy",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const response = await userRequest.put(
        `/user/updateForm?id=${id}`,
        updates
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to update hierarchy.");
    }
  }
);
