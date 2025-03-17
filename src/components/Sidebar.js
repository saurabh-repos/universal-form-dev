"use client";

import { useDispatch, useSelector } from "react-redux";
import { CiCirclePlus } from "react-icons/ci";
import { useEffect, useState } from "react";
import { sideItems } from "@/constants/menuConstants";
import { newForm } from "@/constants/newForm";
import { createForm } from "@/redux/asyncActions/formActions";
import {
  setCreatedForms,
  setEditMode,
  toggleSubItems,
  updateFormLabel,
} from "@/redux/store/slices/sidebarSlice";
import {
  setActiveForm,
  setActiveMainMenu,
  setActivePath,
} from "@/redux/store/slices/menuSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const forms = useSelector((state) => state.sidebar.forms);
  const [editedLabel, setEditedLabel] = useState("");

  const handleAddForm = () => {
    // dispatch(createForm(newForm));
    // const newFormId = forms.length;
    // dispatch(setActiveForm(newFormId));
    // dispatch(setActivePath(newFormId));

    dispatch(createForm(newForm))
      .unwrap()
      .then((data) => {
        dispatch(setCreatedForms(data?.data));
      });
  };

  useEffect(() => {}, [forms]);

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
    <div className="flex flex-col w-2/12 pl-4 h-full sticky pt-4">
      <p className="flex justify-center items-center h-12 border border-black rounded-2xl text-sm font-bold">
        Approval Systems
      </p>
      <div className="flex flex-col w-full h-screen max-h-full overflow-y-auto">
        <div className="flex items-center gap-8 mt-2">
          <p className="text-sm font-bold ml-4">Application</p>
          <CiCirclePlus onClick={handleAddForm} className="cursor-pointer" />
        </div>
        {forms.map((form, index) => (
          <div
            key={form.id}
            className={`mt-2 border border-gray-200 rounded-lg box-border overflow-hidden ${
              form.isExpanded ? "py-0" : "py-1"
            }`}
          >
            <div className="flex justify-between">
              {form.editMode ? (
                <input
                  type="text"
                  value={editedLabel}
                  onChange={handleLabelChange}
                  onBlur={() => handleLabelBlur(form)}
                  autoFocus
                  className="border-b pl-4 border-gray-500 focus:outline-none w-[80%] text-sm"
                />
              ) : (
                <h3
                  // onDoubleClick={() => handleEditClick(form)}
                  onClick={() => {
                    console.log(form);
                    dispatch(toggleSubItems(form.id));
                    dispatch(setActiveMainMenu(0));
                    dispatch(setActiveForm(form.id));
                    dispatch(setActivePath(form.id));
                  }}
                  className={`w-full pl-4 py-1 cursor-pointer text-sm ${
                    form.isExpanded ? "bg-[#D9D9D9]" : ""
                  }`}
                >
                  {form.label}
                </h3>
              )}
            </div>

            {form.isExpanded && (
              <div className="w-[80%] ml-2 flex flex-col py-[2px]">
                {sideItems.map((sub) => (
                  <p
                    key={sub.id}
                    onClick={() => console.log(sub.action)}
                    className="px-2 my-[2px] w-full text-sm flex justify-between items-center cursor-pointer"
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
