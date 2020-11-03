import React from 'react';
import Enzyme from 'enzyme';
import Login from '../components/Login';

describe('Login', () => {
    it("renders Login Page heading", () => {
        const wrapper = Enzyme.shallow((<Login />));
        const header = <h1 className='text'>Login Page</h1>;
        expect(wrapper.contains(header)).toEqual(true);
    });

    it('should have proper props for username field', () => {
        const wrapper = Enzyme.shallow((<Login />));
        expect(wrapper.find('input[name="username"]').props()).toEqual({
          className: 'loginForm__input',
          type: 'text',
          value: '',
          name:'username',
          onChange: expect.any(Function)
        });
    });

});

// const setState = jest.fn();
// const useStateSpy = jest.spyOn(React, 'useState');
// useStateSpy.mockImplementation((init) => [init, setState]);

it('username state is updated on string input', () => {
  const wrapper = Enzyme.shallow((
    <Login />
  ));
  wrapper.find('input[name="username"]').simulate('change', {
    target: {
      name: 'username',
      value: 'Richard',
    },
  });
  // console.log('Wrapper: ', wrapper.find('input[name="username"]').prop('value'));
  expect(wrapper.find('input[name="username"]').prop('value')).toEqual('Richard')
});

// ****** Mocks and spies ******

// const user = {
//     name: "Adeneye David",
//     email: "david@gmail.com",
//     username: "Dave",
//   };

// describe("Login", () => {
//     it("accepts user account props", () => {
//       const wrapper = mount(<Account user={user} />);
//       expect(wrapper.props().user).toEqual(user);
//     });

//     it("contains users account email", () => {
//       const wrapper = mount(<Account user={user} />);
//       const value = wrapper.find("p").text();
//       expect(value).toEqual("david@gmail.com");
//     });
//   });
