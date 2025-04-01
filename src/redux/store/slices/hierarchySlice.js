import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hierarchy: {},
  isLoading: false,
  error: null,
  isCreated: false,
};

const hierarchySlice = createSlice({
  name: "hierarchy",
  initialState,
  reducers: {
    setHierarchyCreatedTrue: (state) => {
      state.isCreated = true;
    },
    addHierarchy: (state, action) => {
      const { hierarchy } = action.payload;
      state.hierarchy = hierarchy;
    },
  },
});

export const { addHierarchy, setHierarchyCreatedTrue } = hierarchySlice.actions;

export default hierarchySlice.reducer;
