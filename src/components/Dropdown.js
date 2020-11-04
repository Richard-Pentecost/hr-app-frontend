import React, { useState } from 'react';
import '../style/Dropdown.scss';

const Dropdown = () => {
	return (
		<div className='dropdown'>
			<ul className='dropdownList'>
				<li className='dropdownList__item'>Profile</li>
				<li className='dropdownList__item'>Settings</li>
				<li className='dropdownList__item'>Logout</li>
			</ul>
		</div>
	);
};

export default Dropdown;
