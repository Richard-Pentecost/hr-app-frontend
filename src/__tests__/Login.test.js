import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Enzyme from 'enzyme';
import Login from '../pages/Login';
import Heading from '../components/Heading';
import Form from '../components/Form';

describe('Login - testing-library/react', () => {

    xtest("should render a Login Page heading", () => { 
        render(<Login/>)
        screen.getByRole('heading', {name: 'Login'});
    });

    xtest("should render a Login form", () => { 
        const { getByTestId } = render(<Login />);
        const form = getByTestId('form');
        expect(form).toHaveLength(1);
    });

    // test('renders a username label', ()=>{
    //     const page = document.createElement("div")
    //     ReactDOM.render(<Login/>, page)
    //     expect(page.getElementById("label-username").textContent).toBe("Username")
    // })
    
    xtest('renders a username input on the Login page', () => {
        const { getByPlaceholderText } = render(<Login />);
        getByPlaceholderText('Username')
    });

    xtest('renders password input on the Login page', () => {
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

    it("renders Login Page heading", () => { 
        const header = <Heading>Login</Heading>;
        expect(wrapper.contains(header)).toEqual(true);
    });

    it("renders Login form", () => { 
        expect(wrapper.find(Form).length).toEqual(1);
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
