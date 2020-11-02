// import { render, screen } from '@testing-library/react';
import React from 'react';
import Enzyme from 'enzyme';
import App from '../components/App';
import toJson from "enzyme-to-json";

describe('App', () => {
  it('renders a div with the className = "app"', () => {
    const wrapper = Enzyme.shallow(<App />);
    expect(wrapper.find('div').hasClass('app')).toBe(true)
  });

  it("renders without crashing", () => {
    Enzyme.shallow(<App />);
  });

  it.skip("can skip a test", () => {
    Enzyme.shallow(<App />);
  });

  it("renders correctly", () => {
    const tree = Enzyme.shallow(<App />);
    expect(toJson(tree)).toMatchSnapshot();
  });

})
// press u to update screenshot