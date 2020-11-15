import React from 'react';
import '../style/Input.scss';

const Input = ({ type, value, name, label, inputChangeHandler}) => {

  return (
    <div className='input'>
      <div className='labelContainer'>
        <label className='labelContainer__label'>
          {label}
        </label>
      </div>
      <div className='inputContainer'>
        <input 
          className='inputContainer__input'
          type={type}
          value={value}
          name={name}
          onChange={inputChangeHandler}
        />
      </div>
    </div>
  );
};

export default Input;
