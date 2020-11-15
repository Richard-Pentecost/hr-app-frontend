import React from 'react';
import Input from './Input'
import Button from './Button';
import Select from './Select';
import DateInput from './DateInput';
import '../style/Form.scss';

const Form = ({ formArr, handleInputChange, handleSubmit, btnText }) => {

  const form = formArr.map(input => {
    switch(input.type) {
      case 'select':
        return (
          <Select 
            key={input.name}
            value={input.value}
            name={input.name}
            label={input.label}
            inputChangeHandler={handleInputChange}
          />
        );
      case 'date':
        return ( 
          <DateInput 
            key={input.name}
            value={input.value}
            name={input.name}
            label={input.label}
            inputChangeHandler={handleInputChange}
          />
        );
      default:
        return (
          <Input 
            key={input.name}
            type={input.type}
            value={input.value}
            name={input.name}
            label={input.label}
            inputChangeHandler={handleInputChange}
          />
        );
    }
  });

  return (
    <div className='form'>
      <form onSubmit={handleSubmit}>      
        <div className='form__inputs'>
          {form}
        </div>
        <div className='form__button'>
          <Button text={btnText} />
        </div>
      </form>
    </div>
  )
}

export default Form;
