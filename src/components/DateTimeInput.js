import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

const DateTimeInput = ({ value, name, label, inputChangeHandler}) => {

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
            showTimeSelect
            dateFormat="Pp"
            value={value}
            name={name}
            onChange={inputChangeHandler}
            selected={moment(value).toDate()}
          />
        </div>
      </div>
    );
  };
  
  export default DateTimeInput