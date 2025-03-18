import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';


const TimePickerComp = ({ selectedTime, onChange }) => {
  const [time, setTime] = useState(selectedTime || new Date());

  const handleChange = (date) => {
    const formattedTime = format(date, "hh:mm aa");
    setTime(date);
    onChange(formattedTime);
  };

  return (
    <div className="relative w-full">
      <DatePicker
        selected={time}
        onChange={handleChange}
        showTimeSelect
        showTimeSelectOnly
        timeFormat="hh:mm aa"
        dateFormat="hh:mm aa"
        timeCaption="Time"
        className="border p-2 w-full rounded mt-1 outline-none pr-10"
        placeholderText="Select time"
      />
      {/* <Clock className="absolute left-20 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} /> */}
    </div>
  );
};

export default TimePickerComp;
