"use client";
import React, { useState } from "react";
import CustomSelect from "../CustomSelect";
import { FaRegStar } from "react-icons/fa";
import {
  MdLinearScale,
  MdOutlineCheckBox,
  MdOutlineExpandCircleDown,
  MdRadioButtonChecked,
  MdShortText,
} from "react-icons/md";
import { BsJustifyLeft } from "react-icons/bs";
import { PiCloudArrowUpLight } from "react-icons/pi";
import { CgMenuGridO, CgMenuGridR } from "react-icons/cg";
import { IoMdCalendar } from "react-icons/io";
import { FiClock } from "react-icons/fi";

const questionTypes = [
  { label: "Short answer", value: "short_answer", icon: <MdShortText /> },
  { label: "Paragraph", value: "paragraph", icon: <BsJustifyLeft /> },
  {
    label: "Multiple choice",
    value: "multiple_choice",
    icon: <MdRadioButtonChecked />,
  },
  { label: "Checkboxes", value: "checkboxes", icon: <MdOutlineCheckBox /> },
  { label: "Dropdown", value: "dropdown", icon: <MdOutlineExpandCircleDown /> },
  { label: "File upload", value: "file_upload", icon: <PiCloudArrowUpLight /> },
  { label: "Linear scale", value: "linear_scale", icon: <MdLinearScale /> },
  { label: "Rating", value: "rating", icon: <FaRegStar /> },
  {
    label: "Multiple-choice grid",
    value: "multiple_choice_grid",
    icon: <CgMenuGridO />,
  },
  { label: "Tick box grid", value: "tick_box_grid", icon: <CgMenuGridR /> },
  { label: "Date", value: "date", icon: <IoMdCalendar /> },
  { label: "Time", value: "time", icon: <FiClock /> },
];

function FieldTypeSelect() {
  const [selectedType, setSelectedType] = useState(questionTypes[2]);

  console.log("selectedType", selectedType);

  return (
    <div className="relative w-full">
      <CustomSelect
        options={questionTypes}
        selected={selectedType}
        onSelect={setSelectedType}
        maxHeight={280}
        maxWidth={250}
      />
    </div>
  );
}

export default FieldTypeSelect;
