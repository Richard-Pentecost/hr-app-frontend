import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import '../style/Input.scss';

const DateInput = ({ value, name, label, inputChangeHandler}) => {

  return (
    <div className='input'>
      <div className='labelContainer'>
        <label className='labelContainer__label'>
          {label}
        </label>
      </div>
      <div className='inputContainer'>
        <DatePicker 
          className='inputContainer__input'
          selected={moment(value).toDate()}
          dateFormat='dd/MM/yyyy'
          name={name}
          onChange={inputChangeHandler}
        />
      </div>
    </div>
  );
};

export default DateInput