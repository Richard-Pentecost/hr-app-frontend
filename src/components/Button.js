import React from 'react';
import '../style/Button.scss';

const Button = ({ text }) => {
  return (
    <button type='submit' className='button'>{text}</button>
  );
};

export default Button;
