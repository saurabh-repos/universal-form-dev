import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosCheckboxOutline } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { addTagOption, removeTagOption, updateTagOption } from "@/redux/store/slices/formSlice";

function Checkbox({ formId, sectionIndex, tagIndex }) {
  const dispatch = useDispatch();

  const options = useSelector(
    (state) => state.forms.tempForms[formId]?.sections[sectionIndex]?.tags[tagIndex]?.options || []
  );

  const handleOptionChange = (optionId, value) => {
    dispatch(updateTagOption({ formId, sectionIndex, tagIndex, optionId, value }));
  };

  const addOption = () => {
    dispatch(addTagOption({ formId, sectionIndex, tagIndex, option: { id: Date.now(), value: "" } }));
  };

  const addOtherOption = () => {
    dispatch(addTagOption({ formId, sectionIndex, tagIndex, option: { id: Date.now(), value: "Other" } }));
  };

  const removeOption = (optionId) => {
    dispatch(removeTagOption({ formId, sectionIndex, tagIndex, optionId }));
  };

  return (
    <div className="w-full flex flex-col gap-1 pl-4">
      {options.map((option) => (
        <div key={option.id} className="flex items-center">
          <IoIosCheckboxOutline className="text-base text-[#999999]" />
          <input
            type="text"
            value={option.value}
            onChange={(e) => handleOptionChange(option.id, e.target.value)}
            className="flex-1 px-2 outline-none rounded-md text-base text-black"
            placeholder="Option"
          />
          <div className="w-[4%] cursor-pointer" onClick={() => removeOption(option.id)}>
            <RxCross2 className="text-[#999999]" />
          </div>
        </div>
      ))}
      <div className="flex items-center text-sm gap-2">
        <IoIosCheckboxOutline className="text-base text-[#999999]" />
        <p onClick={addOption} className="cursor-pointer text-base text-[#999999]">Add Option</p>
        <p>or</p>
        <p onClick={addOtherOption} className="cursor-pointer text-base text-[#1C73E8]">Add &quot;Other&quot;</p>
      </div>
    </div>
  );
}

export default Checkbox;
