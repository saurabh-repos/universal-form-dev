import React, { useState } from 'react';

function FormHeader() {
  const [title, setTitle] = useState('Untitled Form');
  const [description, setDescription] = useState('Form description');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  const handleDoubleClickTitle = () => {
    setIsEditingTitle(true);
  };

  const handleDoubleClickDescription = () => {
    setIsEditingDescription(true);
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleBlurTitle = () => {
    setIsEditingTitle(false);
  };

  const handleBlurDescription = () => {
    setIsEditingDescription(false);
  };

  return (
    <div className='w-[80%] border border-black rounded-2xl mt-4 p-2 min-h-auto'>
      {isEditingTitle ? (
        <input
          type="text"
          value={title}
          onChange={handleChangeTitle}
          onBlur={handleBlurTitle}
          className='text-2xl font-bold text-black outline-none w-full'
          autoFocus
        />
      ) : (
        <p className='text-2xl font-bold text-black break-words' onDoubleClick={handleDoubleClickTitle}>
          {title}
        </p>
      )}
      {isEditingDescription ? (
        <input
          type="text"
          value={description}
          onChange={handleChangeDescription}
          onBlur={handleBlurDescription}
          className='text-sm font-normal text-[#999999] outline-none w-full'
          autoFocus
        />
      ) : (
        <p className='text-sm font-normal text-[#999999] break-words' onDoubleClick={handleDoubleClickDescription}>
          {description}
        </p>
      )}
    </div>
  );
}

export default FormHeader;
