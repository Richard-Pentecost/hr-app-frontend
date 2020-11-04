import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../skillsForCareLogo.png';
import '../style/Navbar.scss';

const Navbar = props => {
	return (
		<div className='navbar'>
            <div className='menuBar'>
				<div className='menuBar__menu'>
                    <span>Menu</span>
                </div>
			</div>
            <div className='logoContainer'>
				<Link to='/home'>
					<img src={logo} alt='Skills for Care Logo' className='logoContainer__logo' />
				</Link>
			</div>
		</div>

	)
};

export default Navbar;