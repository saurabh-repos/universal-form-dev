import { useState, useEffect } from "react";
import {
  MdCheckCircleOutline,
  MdOutlineAddCircle,
  MdOutlineCancel,
} from "react-icons/md";

function TypeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (isOpen && !event.target.closest(".modal-container")) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative w-max flex items-center">
      <button onClick={() => setIsOpen(!isOpen)} className="ml-4">
        <MdOutlineAddCircle className="text-green-500 hover:text-green-600 transition-colors duration-300 h-6 w-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="w-80 h-36 bg-white shadow-lg rounded-lg border border-black flex modal-container relative">
            <div className="flex flex-col justify-around border-r border-black rounded-lg w-[85%] h-full p-4">
              <div className="w-full flex flex-col gap-2">
                <p className="text-xs text-black font-bold">Age</p>
                <p className="text-xs text-[#999999] font-bold ">Type 1</p>
              </div>

              <div className="flex gap-2 ">
                <div className="w-1/2 flex flex-col gap-1">
                  <p className="text-xs text-black">Select Operator</p>
                  <div className="border border-dashed border-black rounded-lg">
                    <select>
                      <option>One</option>
                      <option>Two</option>
                      <option>Three</option>
                    </select>
                  </div>
                </div>
                <div className="w-1/2 flex flex-col gap-1">
                  <p className="text-xs text-black">Enter Value</p>
                  <div className="border border-dashed border-black rounded-lg">
                    <input type="text" />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[15%] flex flex-col items-center gap-4 pt-2">
              <MdOutlineCancel
                className="w-6 h-6 text-red-600 cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
              <MdCheckCircleOutline className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TypeModal;
