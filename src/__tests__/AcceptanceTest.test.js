import React from 'react';
import Enzyme from 'enzyme';
import App from '../components/App';

describe('Logging in', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = Enzyme.mount(<App />)
    });
    
    it('user sees a welcome message on the Home Page after logging in', () => {
        wrapper.find('input[name="username"]').simulate('change', {
			target: {
				name: 'username',
				value: 'jfawl',
			},
        });
        wrapper.find('input[name="password"]').simulate('change', {
			target: {
				name: 'password',
				value: '1234',
			},
        });
        wrapper.find('form').simulate('submit', { 
			preventDefault: jest.fn()
        });
        const welcomeMessage = <h1 className='userInfo__headerText'>Welcome Joanna!</h1>
        expect(wrapper.contains(welcomeMessage)).toEqual(true);
    }); 
});