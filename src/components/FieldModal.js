import { useState } from "react";
import { MdOutlineInfo } from "react-icons/md";
import { TbPhoto } from "react-icons/tb";
import { LuTextCursorInput } from "react-icons/lu";
import { FaCheck } from "react-icons/fa";
import { CiCircleMore } from "react-icons/ci";

const items = [
  { id: 1, name: "Description", icon: <MdOutlineInfo /> },
  { id: 2, name: "Inline photo", icon: <TbPhoto /> },
  { id: 3, name: "Input Validation", icon: <LuTextCursorInput /> },
];

function FieldModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(3);

  return (
    <div className="relative">
      <CiCircleMore
        className="w-6 h-6 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div className="absolute left-10 -bottom-2 mt-2 w-44 bg-white shadow-lg rounded-lg border p-2">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item.id)}
              className={`flex items-center justify-between p-2 rounded-lg cursor-pointer ${
                selectedItem === item.id ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{item.icon}</span>
                <span className="text-xs">{item.name}</span>
              </div>

              {selectedItem === item.id && (
                <span>
                  <FaCheck className="text-sm"/>
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FieldModal;
