import { createSlice } from "@reduxjs/toolkit";
import {
  createForm,
  deleteForm,
  fetchForms,
  updateForm,
  saveFormToServer,
} from "@/redux/asyncActions/formActions";
import { toast } from "react-toastify";

const initialState = {
  forms: {},
  isLoading: false,
  error: null,
  formChanges: {},
  tempForms: {},
  activeFormId:null
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormChanges: (state, action) => {
      const { formId, hasChanges } = action.payload;
      state.formChanges[formId] = hasChanges;
    },    
    // Create a new section
    addSection: (state, action) => {
      const { formId, section } = action.payload;
      state.tempForms[formId].sections.push(section);
      if (!state.formChanges[formId]) {
        state.formChanges[formId] = true;
      }
    },
    
    // Create a new tag (question)
    addTag: (state, action) => {
      const { formId, sectionIndex, tag } = action.payload;
      state.tempForms[formId].sections[sectionIndex].tags.push(tag);
      if (!state.formChanges[formId]) {
        state.formChanges[formId] = true;
      }
    },
    
    // Update tag name
    updateTagName: (state, action) => {
      const { formId, sectionIndex, tagIndex, name } = action.payload;
      state.tempForms[formId].sections[sectionIndex].tags[tagIndex].title = name;
      if (!state.formChanges[formId]) {
        state.formChanges[formId] = true;
      }
    },
    
    // Update tag description
    updateTagDescription: (state, action) => {
      const { formId, sectionIndex, tagIndex, description } = action.payload;
      state.tempForms[formId].sections[sectionIndex].tags[tagIndex].description = description;
      if (!state.formChanges[formId]) {
        state.formChanges[formId] = true;
      }
    },
    
    // Update tag type
    updateTagType: (state, action) => {
      const { formId, sectionIndex, tagIndex, type } = action.payload;
      state.tempForms[formId].sections[sectionIndex].tags[tagIndex].type = type;
      state.tempForms[formId].sections[sectionIndex].tags[tagIndex].options = [];
      if (!state.formChanges[formId]) {
        state.formChanges[formId] = true;
      }
    },
    
    // Add an option to a tag
    addTagOption: (state, action) => {
      const { formId, sectionIndex, tagIndex, option } = action.payload;
      state.tempForms[formId].sections[sectionIndex].tags[tagIndex].options.push(option);
      if (!state.formChanges[formId]) {
        state.formChanges[formId] = true;
      }
    },
    
    // Remove an option from a tag
    removeTagOption: (state, action) => {
      const { formId, sectionIndex, tagIndex, optionIndex } = action.payload;
      state.tempForms[formId].sections[sectionIndex].tags[tagIndex].options.splice(optionIndex, 1);
      if (!state.formChanges[formId]) {
        state.formChanges[formId] = true;
      }
    },

    updateTagOption: (state, action) => {
      const { formId, sectionIndex, tagIndex, optionId, value } = action.payload;
      const options = state.tempForms[formId].sections[sectionIndex].tags[tagIndex].options;
      const option = options.find((opt) => opt.id === optionId);
      if (option) option.value = value;
      state.formChanges[formId] = true;
    },    
    
    // Update required status of a tag
    updateTagRequired: (state, action) => {
      const { formId, sectionIndex, tagIndex, required } = action.payload;
      state.tempForms[formId].sections[sectionIndex].tags[tagIndex].required = required;
      if (!state.formChanges[formId]) {
        state.formChanges[formId] = true;
      }
    },
    updateFormTitle(state, action) {
      const { formId, title } = action.payload;
      const form = state.tempForms[formId];
      if (form) {
        form.title = title;
      }
      if (!state.formChanges[formId]) {
        state.formChanges[formId] = true;
      }
    },
    updateFormDescription(state, action) {
      const { formId, description } = action.payload;
      const form = state.tempForms[formId];
      if (form) {
        form.description = description;
      }
      if (!state.formChanges[formId]) {
        state.formChanges[formId] = true;
      }
    },
    setActiveFormId: (state, action) => {
      state.activeFormId = action.payload;
    },
    deleteTag: (state, action) => {
      const { formId, sectionIndex, tagIndex } = action.payload;
      state.tempForms[formId].sections[sectionIndex].tags.splice(tagIndex, 1);
      if (!state.formChanges[formId]) {
        state.formChanges[formId] = true;
      }
    },
    duplicateTag: (state, action) => {
      const { formId, sectionIndex, tagIndex } = action.payload;
      const tag = state.tempForms[formId].sections[sectionIndex].tags[tagIndex];
      state.tempForms[formId].sections[sectionIndex].tags.splice(tagIndex + 1, 0, tag);
      if (!state.formChanges[formId]) {
        state.formChanges[formId] = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
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
        state.tempForms = { ...state.forms };
      })
      .addCase(fetchForms.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload || "Something went wrong.");
      })
      .addCase(createForm.fulfilled, (state, action) => {
        state.forms[action.payload.data._id] = action.payload.data;
        state.tempForms[action.payload.data._id] = action.payload.data;
        state.formChanges[action.payload.data._id] = false;
        toast.success("Form created successfully!");
      })
      .addCase(updateForm.fulfilled, (state, action) => {
        state.forms[action.payload.data._id] = action.payload.data;
        state.tempForms[action.payload.data._id] = action.payload.data;
        state.formChanges[action.payload.data._id] = true;
        toast.success("Form updated successfully!");
      })
      .addCase(saveFormToServer.fulfilled, (state, action) => {
        state.forms[action.payload.data._id] = action.payload.data;
        state.tempForms[action.payload.data._id] = action.payload.data;
        state.formChanges[action.payload.data._id] = false;
        toast.success("Form saved successfully!");
      })
      .addCase(deleteForm.fulfilled, (state, action) => {
        delete state.forms[action.payload];
        delete state.tempForms[action.payload];
        delete state.formChanges[action.payload];
        toast.success("Form deleted successfully!");
      });
  },
});

export const {
  setFormChanges,
  updateTempForm,
  addSection,
  addTag,
  updateTagName,
  updateTagDescription,
  updateTagType,
  addTagOption,
  removeTagOption,
  updateTagOption,
  updateTagRequired,
  updateFormTitle, 
  updateFormDescription,
  setActiveFormId,
  deleteTag,
  duplicateTag
} = formSlice.actions;

export default formSlice.reducer;
