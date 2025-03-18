import React from 'react';

function ToggleSwitch({ isOn,toggleSwitch }) {

  return (
    <div className="flex items-center">
      <div
        className={`w-10 h-5 flex items-center bg-white border border-black rounded-full p-1 cursor-pointer ${
          isOn ? 'bg-white' : 'bg-white'
        }`}
        onClick={toggleSwitch}
      >
        <div
          className={`bg-black w-3 h-3 rounded-full shadow-md transform duration-300 ease-in-out ${
            isOn ? 'translate-x-5' : ''
          }`}
        ></div>
      </div>
    </div>
  );
}

export default ToggleSwitch;
