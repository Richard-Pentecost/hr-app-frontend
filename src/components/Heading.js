import React from 'react';
import { H3 } from '@govuk-react/heading';
import '../style/Heading.scss';

const Heading = ({ children }) => {
  return (
    <div className='heading'>
      <H3>{children}</H3> 
    </div>
  );
}

export default Heading;
