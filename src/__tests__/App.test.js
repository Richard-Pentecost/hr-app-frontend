import React from 'react';
import Enzyme from 'enzyme';
import App from '../components/App';
import toJson from "enzyme-to-json";

describe('App', () => {
	it("renders without crashing", () => {
		Enzyme.shallow(<App />);
	});

	it('renders a div with the className = "app"', () => {
		const wrapper = Enzyme.shallow(<App />);
		expect(wrapper.find('div').hasClass('app')).toBe(true)
	});

	it("renders correctly", () => {
		const tree = Enzyme.shallow(<App />);
		expect(toJson(tree)).toMatchSnapshot();
	});
})