import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import Home from '../components/Home';


describe('Home', () => {
    xit('renders a div with a className of "userInfo"', () => {
        const wrapper = mount(<MemoryRouter><Home id={2} /></MemoryRouter>)
        // const wrapper = shallow(<Home id={2} />)
        //console.log(wrapper.find('div').hasClass('userInfo'))
        expect(wrapper.find('div[className="userInfo"]').hasClass('userInfo')).toBe(true);
        // expect(wrapper.find('div').hasClass('userInfo')).toBe(true);
        // expect(wrappedShallow.find('div').hasClass('userInfo')).toBe(true);
    });

    it('renders a welcome message with the name of the employee', () => {
        const wrapper = mount(<MemoryRouter><Home id={2} /></MemoryRouter>)
        const welcomeMessage = <h1 className='userInfo__headerText'>Welcome Joanna!</h1>
        expect(wrapper.contains(welcomeMessage)).toBe(true);
    });
});