import React from 'react';
import Enzyme from 'enzyme';
import Home from '../components/Home';

describe('Home', () => {
	let wrapper;
	
    beforeEach(() => {
        wrapper = Enzyme.shallow(<Home id={2}/>);
	});
	
// 	xit("renders Login Page heading", () => { 
// 		// const firstName = 'Joanna'
// 		const user = { firstName: 'Joanna', surname: 'Fawl', role: 'Academy Engineer', email: 'j@f.com', telephone: '12345' }
// 		jest.spyOn(React, 'useEffect').mockImplementation(f => {
// 			return {
// 				firstName: user.firstName,
// 				role: user.role,
// 				email: user.email,
// 				telephone: user.telephone
// 			}
// 		});
// 		const welcomeMessage = <h1 className='userInfo__headerText'>Welcome Joanna!</h1>
// 		console.log('Wrapper: ' + wrapper.find('div'));
// 		expect(wrapper.contains(welcomeMessage)).toEqual(true);
//     });
});