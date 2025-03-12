import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


export const saveFormsToServer = createAsyncThunk(
  "form/saveFormsToServer",
  async (forms, { rejectWithValue }) => {
    try {
      return await new Promise((resolve) =>
        setTimeout(() => {
          console.log("Forms saved to server:", forms); 
          resolve(forms);
        }, 2000)
      );
    } catch (error) {
      return rejectWithValue("Failed to save forms.");
    }
  }
);

const initialState = {
  forms: {},
  activeFormId: null,
  isSaving: false,
};

const defaultValidation = {
  type: "",
  condition: "",
  value: "",
  min: "",
  max: "",
  errorMessage: "",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    createForm: (state) => {
      const formId = `form-${Date.now()}`;
      state.forms[formId] = {
        title: "Untitled Form",
        description: "",
        bgColor: "#FFFFFF",
        font: "Arial",
        sections: [
          {
            title: "New Page",
            description: "",
            tags: [
              {
                title: "",
                description: "",
                type: "input",
                options: [],
                required: false,
                validation: { ...defaultValidation },
              },
            ],
          },
        ],
      };
      state.activeFormId = formId;
    },

    updateFormDetails: (state, action) => {
      const { formId, key, value } = action.payload;
      if (state.forms[formId]) {
        state.forms[formId][key] = value;
      }
    },

    deleteForm: (state, action) => {
      const formId = action.payload;
      delete state.forms[formId];
      if (state.activeFormId === formId) {
        state.activeFormId = Object.keys(state.forms)[0] || null;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(saveFormsToServer.pending, (state) => {
        state.isSaving = true;
        toast.info("Saving to server...");
      })
      .addCase(saveFormsToServer.fulfilled, (state, action) => {
        state.isSaving = false;
        toast.success("Forms saved successfully!");
      })
      .addCase(saveFormsToServer.rejected, (state, action) => {
        state.isSaving = false;
        toast.error(action.payload || "Error saving forms.");
      });
  },
});

export const { createForm, updateFormDetails, deleteForm } = formSlice.actions;
export default formSlice.reducer;
