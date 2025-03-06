"use client";
import React, { useEffect, useRef, useState } from 'react';

function CustomSelect({ options, selected, onSelect, maxHeight,maxWidth }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(selected);
  const [dropUp, setDropUp] = useState(false);
  const selectRef = useRef(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option); // Ensure the onSelect function gets called
    setIsOpen(false);
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const checkDropDirection = () => {
    const rect = selectRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    if (spaceBelow < maxHeight && spaceAbove > spaceBelow) {
      setDropUp(true);
    } else {
      setDropUp(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      checkDropDirection();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedOption(selected);
  }, [selected]);

  return (
    <div ref={selectRef} className="relative" style={{ maxWidth: maxWidth }}>
      <div
        onClick={toggleOpen}
        className="w-full cursor-pointer focus:ring-2 focus:ring-blue-500"
      >
        {selectedOption.icon && <span className="inline-block mr-2">{selectedOption.icon}</span>}
        {selectedOption.label}
      </div>
      {isOpen && (
        <div
          className={`absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg ${dropUp ? 'bottom-full mb-1' : 'top-full mt-1'}`}
          style={{ maxHeight: maxHeight, overflowY: 'auto' }}
        >
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleSelect(option)}
              className="p-2 cursor-pointer hover:bg-gray-200 flex items-center"
            >
              {option.icon && <span className="inline-block mr-2">{option.icon}</span>}
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomSelect;
