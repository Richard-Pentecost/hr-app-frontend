import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Dropdown.scss';

const Dropdown = ({onLogout, adminLevel}) => {
	
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
			{(adminLevel === 'Admin') && 			
			<div className='dropdownList__item'>
				<Link to='/create-employee' className='dropdownList__link'>
					Create Employee
				</Link>
			</div>}
			{(adminLevel !== 'Employee') && 
			<div className='dropdownList__item'>
				<Link to='/employees-list' className='dropdownList__link'>
					View Employees { adminLevel === 'Manager' && 'You Manage' }
				</Link>
			</div>}
			
			<div className='dropdownList__item'>
				<Link to='/' className='dropdownList__link' onClick={onLogout}>
					Logout
				</Link>
			</div>
		</div>
	);
};

export default Dropdown;
