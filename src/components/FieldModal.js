import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineInfo } from "react-icons/md";
import { TbPhoto } from "react-icons/tb";
import { LuTextCursorInput } from "react-icons/lu";
import { FaCheck } from "react-icons/fa";
import { CiCircleMore } from "react-icons/ci";
import { updateTagProperty } from "@/redux/store/slices/formSlice";

const items = [
  { id: 1, name: "Description", icon: <MdOutlineInfo />, property: "descriptionConcent" },
  { id: 2, name: "Inline photo", icon: <TbPhoto />, property: "inlinePhoto" },
  { id: 3, name: "Input Validation", icon: <LuTextCursorInput />, property: "inputValidation" },
];

function FieldModal({ tagIndex, sectionIndex, formId }) {
  const dispatch = useDispatch();
  const tag = useSelector(
    (state) =>
      state.forms?.tempForms?.[formId]?.sections?.[sectionIndex]?.tags?.[tagIndex]
  );

  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);

  useEffect(() => {
    if (tag) {
      const initialSelected = items
        .filter((item) => tag[item.property])
        .map((item) => item.id);
      setSelectedItem(initialSelected);
    }
  }, [tag]);

  const handleItemClicked = (id) => {
    const item = items.find((item) => item.id === id);
    if (!item) return;

    dispatch(
      updateTagProperty({
        formId,
        sectionIndex,
        tagIndex,
        property: item.property,
        value: !selectedItem.includes(id),
      })
    );

    setSelectedItem((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

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
              onClick={() => handleItemClicked(item.id)}
              className={`flex items-center justify-between p-2 rounded-lg cursor-pointer ${
                selectedItem.includes(item.id)
                  ? "bg-gray-200"
                  : "hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{item.icon}</span>
                <span className="text-xs">{item.name}</span>
              </div>

              {selectedItem.includes(item.id) && (
                <span>
                  <FaCheck className="text-sm" />
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
