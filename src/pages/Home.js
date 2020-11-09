import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { users } from '../data.json';
import Card from '../components/Card';
import axios from 'axios';
import moment from 'moment';
import "../style/Home.scss";

const URL = 'https://hr-app-backend-api.herokuapp.com/api/user';

const Home = ({isLoggedin, id}) => {
	const [firstName, setFirstName] = useState('');
	const [surname, setSurname] = useState('');
	const [role, setRole] = useState('');
	const [email, setEmail] = useState('');
	const [telephone, setTelephone] = useState('');
	const [dob, setDob] = useState('');

	useEffect(() => {
		const fetchUser = async () => {
			console.log(id);
			try {
				const response = await axios.get(`${URL}/${id}`);
				const { firstName, surname, role, email, telephone, doB } = response.data;
				setFirstName(firstName);
				setSurname(surname);
				setRole(role);
				setEmail(email);
				setTelephone(telephone);
				setDob(moment(doB).format('Do MMM YYYY'));
			} catch (error) {
				console.log(error);
			}
		}

		fetchUser();
		// const user = users.find(item => item.id === props.id);
		
		// if (user) {
		// 	setFirstName(user.firstName);
		// 	setSurname(user.surname);
		// 	setRole(user.role);
		// 	setEmail(user.email);
		// 	setTelephone(user.telephone);
		// 	setDob(user.dob);
		// }
	}, [id]);

		
	let userInfo = null;
	if (firstName && role && email && telephone) {
		userInfo = ( 
			<div className='userInfo__header'>
				<h1 className='userInfo__headerText'>Welcome {firstName}!</h1>
				<h2 className='userInfo__text'>{role}</h2>
				<h2 className='userInfo__text'>{email}</h2>
				<h2 className='userInfo__text'>{telephone}</h2>
			</div>
		);
	}



	// const handleClick = () => {
	// 	props.history.push('/settings');
	// }
		

	const navigation = (
		<Link to='/settings'>Go to settings page</Link>
	);

	// const data = [
	// 	{ label: 'First Name', value: {firstName} },
	// 	{ label: 'Surname', value: {surname} },
	// 	{ label: 'Date of Birth', value: {dob} }
	// ]
	return (
		<div className='userInfo'>
			{userInfo}
			<Card firstName={firstName} surname={surname} dob={dob} />
			{/* <Card 
				heading='Basic Information' 
				data={data}
			/> */}
		</div>
	)
}

export default Home