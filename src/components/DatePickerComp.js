import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { format, parseISO } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerComp = ({ selectedDate, onChange }) => {
  const [startDate, setStartDate] = useState(selectedDate ? parseISO(selectedDate) : new Date());

  const handleChange = (date) => {
    const formattedDate = format(date, "dd-MM-yyyy");
    setStartDate(date);
    onChange(formattedDate);
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={handleChange}
      dateFormat="dd-MM-yyyy"
      className="border p-2 w-full rounded mt-1 outline-none"
      placeholderText="Select date"
    />
  );
};

export default DatePickerComp;
