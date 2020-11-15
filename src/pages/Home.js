import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { users } from '../data.json';
import Card from '../components/Card';
import axios from 'axios';
import moment from 'moment';
import "../style/Home.scss";
import { URL } from '../utils/Constants';

const Home = ({isLoggedin, id, user, setUser}) => {

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await axios.get(`${URL}/user/${id}`);
				const { firstName, surname, role, email, telephone, doB, permissionLevel, address, nextOfKin, salary, location } = response.data;
				setUser({
					firstName,
					surname,
					role,
					email,
					telephone,
					doB,
					permissionLevel,
					nextOfKin,
					salary,
					location,
					address,
				});
			} catch (error) {
				console.log(error);
			}
		}
		fetchUser();

	}, [setUser, id]);

		
	let userInfo = null;
	if (user.firstName && user.role && user.email && user.telephone) {
		userInfo = ( 
			<div className='userInfo__header'>
				<h1 className='userInfo__headerText'>Welcome {user.firstName}!</h1>
				<h2 className='userInfo__text'>{user.role}</h2>
				<h2 className='userInfo__text'>{user.email}</h2>
				<h2 className='userInfo__text'>{user.telephone}</h2>
			</div>
		);
	}



	// const handleClick = () => {
	// 	props.history.push('/settings');
	// }
		

	const navigation = (
		<>
			<Link to='/employees-list'>Go to employee list</Link>
			<Link to='/create-employee'>Create Employee</Link>
		</>
	);

	return (
		<div className='userInfo'>
			{userInfo}
			<Card firstName={user.firstName} surname={user.surname} doB={user.doB} />
			{navigation}
		</div>
	)
}

export default Home