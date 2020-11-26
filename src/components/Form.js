import React from 'react';
import Input from './Input'
import Button from '@govuk-react/button';
import Select from './Select';
import DateInput from './DateInput';
import DateTimeInput from './DateTimeInput';
import ErrorText from '@govuk-react/error-text';
import '../style/Form.scss';

const Form = ({ formArr, handleInputChange, handleSubmit, btnText, errorMessage }) => {

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
        case 'dateTime':
        return ( 
          <DateTimeInput 
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
      <form onSubmit={handleSubmit} data-testid='form'>      
        <div className='form__inputs'>
          {form}
        </div>
        <ErrorText style={{fontSize:'18px', textAlign: 'right'}}>{errorMessage}&nbsp;</ErrorText>
        <div className='form__button'>
        <Button buttonColour='#357ebd' buttonHoverColour='#78aace'>{btnText}</Button>
        </div>
      </form>
    </div>
  )
}

export default Form;
