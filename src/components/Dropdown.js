import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Dropdown.scss';

const Dropdown = (props) => {
	
	return (
		<div className='dropdownList'>
			<div className='dropdownList__item'>
				<Link to='/home' className='dropdownList__link'>
					Profile
				</Link>
			</div>
			<div className='dropdownList__item'>
				<Link to='/edit-information' className='dropdownList__link'>
					Edit Information
				</Link>
			</div>
			<div className='dropdownList__item'>
				<Link to='/create-employee' className='dropdownList__link'>
					Create Employee
				</Link>
			</div>
			<div className='dropdownList__item'>
				<Link to='/employees-list' className='dropdownList__link'>
					List employees
				</Link>
			</div>
			<div className='dropdownList__item'>
				<Link to='/' className='dropdownList__link' onClick={props.onLogout}>
					Logout
				</Link>
			</div>
		</div>
	);
};

export default Dropdown;
