import React from 'react'
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { shallow } from 'enzyme';
import Input from '../components/Input';

// Testing using Enzyme
describe('Input - Enzyme', () => {
  it('renders an input', () => {
    const wrapper = shallow(<Input />)
    expect(wrapper.find('input').hasClass('inputContainer__input')).toBe(true);
  }); 

  it('renders a label with custom text', () => {
    const wrapper = shallow(<Input label='label text' />);
    expect(wrapper.find('label').text()).toEqual('label text');
  });

  it('value changes when typing in input', () => {
    const onChange = jest.fn()
    const wrapper = shallow(<Input name='name' value='hello' inputChangeHandler={onChange}/>);
    const input = wrapper.find('input[name="name"]');
    input.simulate('change', {
      target: { value: 'input string'}
    });
    expect(onChange).toBeCalledTimes(1);
  });
});

// Testing using @testing-library/react
describe('Input - @testing-library/react', () => {
  test('should render an input', () => {
    const { getByRole } = render(<Input />);
    const input = getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  test('should render a label with custom text', () => {
      const { getByText } = render(<Input label='label text' />);
      const label = getByText('label text');
      expect(label).toBeInTheDocument();
  })

  // Next 2 tests are equivalent, with one using fireEvent and the other using userEvent
  // Things to note, using userEvent is asynchronous and so requires async await syntax
  // Using userEvent logs each key stroke and so the onChange is called 12 times in this example
  // Using the fireEvent we give the input a value, so the onChange is only called once
  test('should call the onChange callback when typing in the input using fireEvent', () => {
    const onChange = jest.fn();
    const { getByRole } = render(<Input value='' inputChangeHandler={onChange} />);
    fireEvent.change(getByRole('textbox'), { target: { value: 'input string' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test('should call the onChange callback when typing in the input using userEvent', async () => {
    const onChange = jest.fn();
    const { getByRole } = render(<Input value='' inputChangeHandler={onChange} />);
    await userEvent.type(getByRole('textbox'), 'input string');
    expect(onChange).toHaveBeenCalledTimes(12);
  });
});