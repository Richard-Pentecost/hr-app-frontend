import React from 'react';
import Enzyme from 'enzyme';
import App from '../App';
import toJson from "enzyme-to-json";

describe('App', () => {
	let wrapper;
	
	beforeEach(() => {
        wrapper = Enzyme.shallow(<App />);
	});
	
	it("renders without crashing", () => {
		Enzyme.shallow((<App />));
	});

	it('renders a div with the className = "app"', () => {
		expect(wrapper.find('div').hasClass('app')).toBe(true)
	});

	xit("renders correctly", () => {
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	// it('renders redirect when the isLoggedIn flag is true', () => {
	// 	const isLoggedIn = jest.fn();
	// 	isLoggedIn.mockReturnValue(true);
	// 	expect(wrapper.containsMatchingElement(<Redirect to='/home' />)).toBe(true);
	// });
})