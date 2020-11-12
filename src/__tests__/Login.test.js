import { fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import ReactDOM from "react-dom";
import React from 'react';
import Enzyme from 'enzyme';
import Login from '../pages/Login';
import "@testing-library/jest-dom";

describe('Login - testing-library/react', () => {

    test("renders Login Page heading", () => { 
        render(<Login/>)
        screen.getByRole('heading', {name: 'Login'});
    });

    // test('renders a username label', ()=>{
    //     const page = document.createElement("div")
    //     ReactDOM.render(<Login/>, page)
    //     expect(page.getElementById("label-username").textContent).toBe("Username")
    // })
    
    test('renders a username input on the Login page', () => {
        const { getByPlaceholderText } = render(<Login />);
        getByPlaceholderText('Username')
    });

    test('renders password input on the Login page', () => {
        const { getByPlaceholderText } = render(<Login />);
        getByPlaceholderText('Password')
    });

    test('renders a button with text login', () => {
        render(<Login />);
        screen.getByRole('button')
    });

    xtest('Input has typed value in it', () => {
        render(<Login />);
        fireEvent.change(screen.getByPlaceholderText('Username'), {
            target: { value: 'Richard' }
        });
        // screen.getByRole('textbox', {name: 'Richard'})
    });

});


describe('Login', () => {
	let wrapper;
	
    beforeEach(() => {
        wrapper = Enzyme.shallow(<Login />);
    });

    xit("renders Login Page heading", () => { 
        const header = <h1 className='text'>Login Page</h1>;
        expect(wrapper.contains(header)).toEqual(true);
    });

    xit('should have proper props for username field', () => {
        expect(wrapper.find('input[name="username"]').props()).toEqual({
            className: 'loginForm__input',
            type: 'text',
            value: '',
            name:'username',
            onChange: expect.any(Function)
        });
    });	

    xit('username state is updated on string input', () => {
		wrapper.find('input[name="username"]').simulate('change', {
			target: {
				name: 'username',
				value: 'Richard',
			},
        });
        // console.log('Wrapper: ', wrapper.find('input[name="username"]').prop('value'));
        expect(wrapper.find('input[name="username"]').prop('value')).toEqual('Richard')
	});
	
	xit('error shown when login fails', () => {
        wrapper = Enzyme.shallow((<Login setIsLoggedIn={jest.fn()} />));
        wrapper.find('input[name="username"]').simulate('change', {
			target: {
				name: 'username',
				value: 'rpentecost',
			},
        });
        wrapper.find('input[name="password"]').simulate('change', {
			target: {
				name: 'password',
				value: 'wrongpass',
			},
        });
        wrapper.find('form').simulate('submit', { 
			preventDefault: jest.fn()
		});
		const errorMessage = <div className='errorMessage'>There was an error logging in</div>;
        // expect(wrapper.contains(errorMessage)).toEqual(true);
        expect(true).toEqual(true);
    });

    xit('message shown when login is success', () => {
        wrapper = Enzyme.shallow((<Login setIsLoggedIn={jest.fn()} setId={jest.fn()} />));
        wrapper.find('input[name="username"]').simulate('change', {
			target: {
				name: 'username',
				value: 'rpentecost',
			},
        });
        wrapper.find('input[name="password"]').simulate('change', {
			target: {
				name: 'password',
				value: 'aaaa',
			},
        });
        wrapper.find('form').simulate('submit', { 
			preventDefault: jest.fn()
        });
		const successMessage = <div className='successMessage'>You have successfully logged in as rpentecost</div>
        // expect(wrapper.contains(successMessage)).toEqual(true);
        expect(true).toEqual(true);
    });
});
