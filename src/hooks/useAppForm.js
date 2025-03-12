import { useDispatch, useSelector } from "react-redux";
import {
  createForm,
  setActiveForm,
  updateFormDetails,
  addSection,
  removeSection,
  updateSection,
  addTag,
  removeTag,
  updateTag,
  deleteForm,
  clearAllForms,
  addTagValidation,
  saveFormsToServer,
} from "@/app/store/slices/formSlice";

export const useAppForm = () => {
  const dispatch = useDispatch();
  const forms = useSelector((state) => state?.form?.forms);
  const activeFormId = useSelector((state) => state?.form?.activeFormId);
  const isSaving = useSelector((state) => state?.form?.isSaving);

  // Form Actions
  const createNewForm = () => dispatch(createForm());
  const setActive = (formId) => dispatch(setActiveForm(formId));
  const updateForm = (formId, key, value) =>
    dispatch(updateFormDetails({ formId, key, value }));
  const deleteFormById = (formId) => dispatch(deleteForm(formId));
  const clearAll = () => dispatch(clearAllForms());
  

  // Section Actions
  const addNewSection = (formId) => dispatch(addSection(formId));
  const removeSectionById = (formId, index) =>
    dispatch(removeSection({ formId, index }));
  const updateSectionById = (formId, sectionIndex, updatedSection) =>
    dispatch(updateSection({ formId, sectionIndex, updatedSection }));

  // Tag (Field) Actions
  const addNewTag = (formId, sectionIndex, tagIndex) =>
    dispatch(addTag({ formId, sectionIndex, tagIndex }));
  const updateTagById = (formId, sectionIndex, tagIndex, field, value) =>
    dispatch(updateTag({ formId, sectionIndex, tagIndex, field, value }));
  const removeTagById = (formId, sectionIndex, tagIndex) =>
    dispatch(removeTag({ formId, sectionIndex, tagIndex }));
  const addValidation = (formId, sectionIndex, tagIndex, validation) =>
    dispatch(addTagValidation({ formId, sectionIndex, tagIndex, validation }));

  // Save to Server
  const saveToServer = () => dispatch(saveFormsToServer(forms));

  return {
    forms,
    activeFormId,
    isSaving,
    createNewForm,
    setActive,
    updateForm,
    deleteFormById,
    clearAll,
    addNewSection,
    removeSectionById,
    updateSectionById,
    addNewTag,
    updateTagById,
    removeTagById,
    addValidation,
    saveToServer,
  };
};
