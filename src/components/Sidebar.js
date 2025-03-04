"use client";

import { setActiveForm, setActivePath } from "@/app/store/slices/menuSlice";
import {
  addForm,
  setEditMode,
  toggleSubItems,
  updateFormLabel,
} from "@/app/store/slices/sidebarSlice";
import { useDispatch, useSelector } from "react-redux";
import { CiCirclePlus } from "react-icons/ci";
import { useState } from "react";

const Sidebar = () => {
  const dispatch = useDispatch();
  const forms = useSelector((state) => state.sidebar.forms);
  const isLastFormItem = forms.length - 1;
  const [editedLabel, setEditedLabel] = useState("");

  const handleAddForm = () => {
    dispatch(addForm());
    const newFormId = forms.length;
    dispatch(setActiveForm(newFormId));
    dispatch(setActivePath(newFormId));
  };

  const handleEditClick = (form) => {
    setEditedLabel(form.label);
    dispatch(setEditMode({ id: form.id, editMode: true }));
  };

  const handleLabelChange = (e) => {
    setEditedLabel(e.target.value);
  };

  const handleLabelBlur = (form) => {
    if (editedLabel.trim()) {
      dispatch(updateFormLabel({ id: form.id, label: editedLabel }));
    } else {
      dispatch(setEditMode({ id: form.id, editMode: false }));
    }
  };

  return (
    <div className="flex flex-col w-2/12 pl-4">
      <p className="flex justify-center items-center h-11 border border-black rounded-2xl text-sm font-bold">
        Approval Systems
      </p>
      <div className="flex flex-col w-full">
        {forms.map((form, index) => (
          <div key={form.id} className="mt-2 pl-2">
            {/* <div className="flex justify-between px-4">
              <h3
                onClick={() => {
                  dispatch(toggleSubItems(form.id));
                  dispatch(setActiveForm(form?.menuId));
                  dispatch(setActivePath(form.menuId));
                }}
                onDoubleClick={() => handleEditClick(form)}
              >
                {form.label}
              </h3>
              {index === isLastFormItem && (
                <button onClick={handleAddForm}><CiCirclePlus /></button>
              )}
            </div> */}

            <div className="flex justify-between px-4">
              {form.editMode ? (
                <input
                  type="text"
                  value={editedLabel}
                  onChange={handleLabelChange}
                  onBlur={() => handleLabelBlur(form)}
                  autoFocus
                  className="border-b border-gray-500 focus:outline-none w-[80%]"
                />
              ) : (
                <h3
                  onDoubleClick={() => handleEditClick(form)} // Enable edit mode on double-click
                  onClick={() => {
                    dispatch(toggleSubItems(form.id));
                    dispatch(setActiveForm(form.menuId));
                    dispatch(setActivePath(form.menuId));
                  }}
                  className="cursor-pointer"
                >
                  {form.label}
                </h3>
              )}
              {index === isLastFormItem && (
                <button onClick={handleAddForm}>
                  <CiCirclePlus />
                </button>
              )}
            </div>

            {form.isExpanded && (
              <div className="w-[80%] ml-2 mt-1 flex flex-col border border-gray-200 rounded-lg box-border overflow-hidden">
                {form.subItems.map((sub) => (
                  <p
                    key={sub.id}
                    onClick={() => console.log(sub.action)}
                    className="hover:bg-[#D9D9D9] px-2 py-1 w-full text-sm flex justify-between items-center"
                  >
                    <span>{sub.label}</span>
                    <span>{sub.icon}</span>
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
