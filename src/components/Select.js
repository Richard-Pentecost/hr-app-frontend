import React from 'react';
import '../style/Input.scss';

const Select = ({ value, name, label, inputChangeHandler }) => {

  return (
    <div className='input'>
      <div className='labelContainer'>
        <label className='labelContainer__label'>
          {label}
        </label>
      </div>
      <div className='inputContainer'>
        <select data-testid='select' name={name} value={value} onChange={inputChangeHandler} className='inputContainer__input'>
          <option value=''></option>
          <option value='Employee'>Employee</option>
          <option value='Manager'>Manager</option>
          <option value='Admin'>Admin</option>
        </select>
      </div>
    </div>
  )
}

export default Select;
