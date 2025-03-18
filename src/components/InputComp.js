import React from 'react';

function InputComp({ type, ...props }) {
  return (
    <input type={type} {...props} />
  );
}


export default InputComp;
