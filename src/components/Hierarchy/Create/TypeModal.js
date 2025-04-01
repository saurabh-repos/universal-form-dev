import { useState, useEffect } from "react";
import {
  MdCheckCircleOutline,
  MdOutlineAddCircle,
  MdOutlineCancel,
} from "react-icons/md";

function TypeModal({ onAddChild, onAddValue }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState("select"); // 'select' | 'addValue'

  useEffect(() => {
    function handleClickOutside(event) {
      if (isOpen && !event.target.closest(".modal-container")) {
        setIsOpen(false);
        setStep("select"); // Reset modal step when closed
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative w-max flex items-center">
      <button onClick={() => setIsOpen(true)} className="ml-4 flex items-center gap-2 px-2 py-1 rounded">
        <MdOutlineAddCircle className="text-green-500 h-5 w-5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="w-80 bg-white shadow-lg rounded-lg border border-black modal-container relative p-4">
            
            {/* Step 1: Choose Action */}
            {step === "select" && (
              <div className="flex flex-col gap-4">
                <p className="text-sm font-bold">What would you like to add?</p>
                <button 
                  className="border border-gray-500 px-3 py-1 rounded text-sm hover:bg-gray-100"
                  onClick={() => {
                    onAddChild(); // Trigger callback to add child
                    setIsOpen(false);
                  }}
                >
                  ➕ Add Category
                </button>
                <button 
                  className="border border-gray-500 px-3 py-1 rounded text-sm hover:bg-gray-100"
                  onClick={() => setStep("addValue")}
                >
                  🔢 Add Type
                </button>
              </div>
            )}

            {/* Step 2: Enter Value */}
            {step === "addValue" && (
              <div className="flex flex-col gap-4">
                <p className="text-xs text-black font-bold">Age</p>
                <p className="text-xs text-[#999999] font-bold ">Type 1</p>

                <div className="flex gap-2">
                  <div className="w-1/2 flex flex-col gap-1">
                    <p className="text-xs text-black">Select Operator</p>
                    <select className="border border-dashed border-black rounded-lg px-2 py-1">
                      <option>One</option>
                      <option>Two</option>
                      <option>Three</option>
                    </select>
                  </div>
                  <div className="w-1/2 flex flex-col gap-1">
                    <p className="text-xs text-black">Enter Value</p>
                    <input type="text" className="border border-dashed border-black rounded-lg px-2 py-1" />
                  </div>
                </div>

                <div className="flex justify-between">
                  <MdOutlineCancel className="w-6 h-6 text-red-600 cursor-pointer" onClick={() => setIsOpen(false)} />
                  <MdCheckCircleOutline 
                    className="w-6 h-6 text-green-500 cursor-pointer" 
                    onClick={() => {
                      onAddValue(); // Trigger callback to add value
                      setIsOpen(false);
                    }}
                  />
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

export default TypeModal;
