// import { render, screen } from '@testing-library/react';
import React from 'react';
import Enzyme from 'enzyme';
import App from '../components/App';

describe('App', () => {
  it('renders a div with the className = "app"', () => {
    const wrapper = Enzyme.shallow((
      <App />
    ));
    expect(wrapper.find('div').hasClass('app')).toBe(true)
  });
})
