import React, { useState , useEffect, useCallback} from 'react';
import { Link } from 'react-router-dom';
import logo from '../skillsForCareLogo.png';
import Dropdown from './Dropdown';
import '../style/Navbar.scss';

const Navbar = props => {
	const [showDropdown, setShowDropdown] = useState(false);
	const container = React.createRef();

	const handleClickOutside = useCallback(event => {
		if (container.current && !container.current.contains(event.target)) {
			setShowDropdown(false);
		};
	}, [container]);
	
	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)
	}, [handleClickOutside]);

	const handleShowDropdown = () => {
		setShowDropdown(!showDropdown);
	}

	const handleLogout = () => {
		props.setIsLoggedIn(false);
	};

	return (
		<div className='navbar'>
			<div className='menuBar'>
				{props.isLoggedIn ? (
					<div ref={container} className='menuBar__menu' onClick={handleShowDropdown}>
						<span>Menu</span>
						{showDropdown && <Dropdown onLogout={handleLogout} />}
					</div>
				) : null }
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