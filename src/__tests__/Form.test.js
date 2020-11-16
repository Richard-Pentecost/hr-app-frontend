import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { shallow } from 'enzyme';
import Form from '../components/Form';
import Input from '../components/Input';
import Button from '../components/Button';
import Select from '../components/Select';
import DateInput from '../components/DateInput';

// Testing using Enzyme
describe('Input - Enzyme', () => {

  const mockForm = [
    { type: 'text', value: 'test value 1', name: 'test name 1', label: 'test label 1' },
    { type: 'text', value: 'test value 2', name: 'test name 2', label: 'test label 2' },
    { type: 'select', value: 'test select', name: 'test select', label: 'test select' },
    { type: 'date', value: 'test date', name: 'test date', label: 'test date' },
  ];

  const onChange = jest.fn();
  const onSubmit = jest.fn();

  let form;
  let wrapper;
  beforeEach(() => {
    form = <Form 
      formArr={mockForm} 
      handleInputChange={onChange}
      handleSubmit={onSubmit}
      btnText='Submit' 
    />
    wrapper = shallow(form);
  })

  it('renders a Form with 2 text inputs', () => {
      expect(wrapper.find(Input).length).toEqual(2);
  }); 

  it('renders a Form with a Select Input', () => {
    expect(wrapper.find(Select).length).toEqual(1);
  });

  it('renders a Form with a Date Input', () => {
    expect(wrapper.find(DateInput).length).toEqual(1);
  });

  it('renders a Form with a Button', () => {
    expect(wrapper.find(Button).length).toEqual(1);
  });

  it('calls the onSubmit callback when the form is submitted', () => {
    wrapper.find('form').simulate('submit', onSubmit);
    expect(onSubmit).toBeCalledTimes(1);
  }); 
});

// Testing using @testing-library/react
describe('Input - @testing-library/react', () => {
  const mockForm = [
    { type: 'text', value: 'test value 1', name: 'test name 1', label: 'test label 1' },
    { type: 'text', value: 'test value 2', name: 'test name 2', label: 'test label 2' },
    // { type: 'select', value: 'test select', name: 'test select', label: 'test select' },
    // { type: 'date', value: 'test date', name: '05 October 2011 14:48 UTC', label: 'test date' },
  ];

  const onChange = jest.fn();
  const onSubmit = jest.fn();

  let form;
  beforeEach(() => {
    form = <Form 
      formArr={mockForm} 
      handleInputChange={onChange}
      handleSubmit={onSubmit}
      btnText='Submit' 
    />
    render(form);
  })

  test('should render a Form with 2 text inputs', () => {
    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(2);
  });

  test('should render a Form with a Button', () => {
    const button = screen.getAllByRole('button');
    expect(button).toHaveLength(1);
  });

  test('should call the onSubmit callback when the form is submitted', () => {
    fireEvent.submit(screen.getByTestId('form'));
    expect(onSubmit).toBeCalledTimes(1);
  });
});