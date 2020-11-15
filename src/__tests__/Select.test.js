import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { shallow } from 'enzyme';
import Select from '../components/Select';

// Testing using Enzyme
describe('Select - Enzyme', () => {
  it('renders a select', () => {
    const wrapper = shallow(<Select />)
    expect(wrapper.find('select').hasClass('inputContainer__input')).toBe(true);
  }); 

  it('renders a label with custom text', () => {
    const wrapper = shallow(<Select label='label text' />);
    expect(wrapper.find('label').text()).toEqual('label text');
  });

  it('should call the onChange callback when changing the select option', () => {
    const onChange = jest.fn()
    const wrapper = shallow(<Select name='name' value='' inputChangeHandler={onChange}/>);
    const select = wrapper.find('select[name="name"]');
    select.simulate('change', {
      target: { value: 'admin'}
    });
    expect(onChange).toBeCalledTimes(1);
  });
});

// Testing using @testing-library/react
describe('Select - @testing-library/react', () => {
  test('should render a select', () => {
    const { getByTestId } = render(<Select />);
    const select = getByTestId('select');
    expect(select).toBeInTheDocument();
  });

  test('should render a label with custom text', () => {
      const { getByText } = render(<Select label='label text' />);
      const label = getByText('label text');
      expect(label).toBeInTheDocument();
  })

  test('should call the onChange callback when changing the select option using fireEvent', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(<Select value='' inputChangeHandler={onChange} />);
    fireEvent.change(getByTestId('select'), { target: { value: 'admin' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  })
});