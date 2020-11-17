import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { shallow } from 'enzyme';
import DateInput from '../components/DateInput';
import DatePicker from 'react-datepicker';

// Testing using Enzyme
describe('DateInput - Enzyme', () => {
  it('renders a select', () => {
    const wrapper = shallow(<DateInput />)
    expect(wrapper.find(DatePicker).hasClass('inputContainer__input')).toBe(true);
  }); 

  it('renders a label with custom text', () => {
    const wrapper = shallow(<DateInput label='label text' />);
    expect(wrapper.find('label').text()).toEqual('label text');
  });

  it('should call the onChange callback when changing the date', () => {
    const onChange = jest.fn()
    const wrapper = shallow(<DateInput name='name' value='01/01/2000' inputChangeHandler={onChange}/>);
    const datePicker = wrapper.find(DatePicker);
    datePicker.simulate('change', {
      target: { value: '02/01/2000'}
    });
    expect(onChange).toBeCalledTimes(1);
  });
});

// Testing using @testing-library/react
describe('DateInput - @testing-library/react', () => {
  test('should render a DatePicker', () => {
    const { getByRole } = render(<DateInput />);
    const datePicker = getByRole('textbox');
    expect(datePicker).toBeInTheDocument();
  });

  test('should render a label with custom text', () => {
      const { getByText } = render(<DateInput label='label text' />);
      const label = getByText('label text');
      expect(label).toBeInTheDocument();
  })

  test('should call the onChange callback when changing the select option using fireEvent', () => {
    const onChange = jest.fn();
    // const oldDate = new Date('2019-04-07T10:20:30Z');
    // const newDate = new Date('2019-04-08T10:20:30Z');
    const oldDate = '2020-11-15'
    const newDate = '2020-11-16'
    const { getByRole } = render(<DateInput value={oldDate} inputChangeHandler={onChange} />);
    fireEvent.change(getByRole('textbox'), { target: { value: newDate } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});