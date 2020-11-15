import React from 'react'
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import Button from '../components/Button';

// Testing using Enzyme
describe('Button - Enzyme', () => {
  it('renders a Button with custom text', () => {
    const wrapper = shallow(<Button text='Btn Text' />);
    expect(wrapper.find('button').text()).toEqual('Btn Text');
  }); 
});

// Testing using @testing-library/react
describe('Button - @testing-library/react', () => {
  test('should render a Button with custom text', () => {
    const { getByText } = render(<Button text='Btn Text' />);
    const button = getByText('Btn Text');
    expect(button).toBeInTheDocument();
  })
});