import React from 'react';
import { shallow, mount } from 'enzyme';
import Home from '../components/Home';

describe('Home', () => {
    it('renders a div with a className of "userInfo"', () => {
        const wrapper = shallow(<Home id={2} />)
        expect(wrapper.find('div').hasClass('userInfo')).toBe(true);
    });

    it('renders a welcome message with the name of the employee', () => {
        const wrapper = mount(<Home id={2} />)
        const welcomeMessage = <h1 className='userInfo__headerText'>Welcome Joanna!</h1>
        expect(wrapper.contains(welcomeMessage)).toBe(true);
    });
});