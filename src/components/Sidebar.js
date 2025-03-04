"use client";

import { addForm, toggleSubItems } from "@/app/store/slices/sidebarSlice";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();
  const forms = useSelector((state) => state.sidebar.forms);
  const isLastFormItem = forms.length - 1;

  return (
    <div className="flex flex-col w-2/12 pl-4">
      <p>Approval Systems</p>
      <div className="flex flex-col w-full">
        {forms.map((form, index) => (
          <div key={form.id} className="">
            <div className="flex">
              <h3 onClick={() => dispatch(toggleSubItems(form.id))}>
                {form.label}
              </h3>
              {index === isLastFormItem && (
                <button onClick={() => dispatch(addForm())}>➕</button>
              )}
            </div>

            {form.isExpanded && (
              <div className="flex flex-col border-gray-200 rounded-sm">
                {form.subItems.map((sub) => (
                  <p
                    key={sub.id}
                    onClick={() => console.log(sub.action)}
                    className="hover:bg-gray-500 px-2 py-1 w-3/4 flex justify-between rounded-md"
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
