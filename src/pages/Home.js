import React, { useEffect } from 'react';
import Card from '../components/Card';
import axios from 'axios';
import "../style/Home.scss";
import { localURL, URL } from '../utils/Constants';
import TokenManager from '../utils/token-manager';

const Home = ({user, setUser}) => {

	useEffect(() => {
		const fetchUser = async () => {
			const decodedToken = TokenManager.getTokenPayload();
			const id = decodedToken.unique_name;
			try {
				const axiosHeaders = { headers: { Authorization: 'Bearer ' + TokenManager.getToken() }};
				const response = await axios.get(`${localURL}/user/${id}`, axiosHeaders);
				console.log(response.data.user);
				setUser(response.data.user);
			} catch (error) {
				console.log(error);
			}
		}
		fetchUser();

	}, [setUser]);

	let userInfo = null;
	if (user) {
		userInfo = ( 
			<div className='userInfo__header'>
				<h1 className='userInfo__headerText'>Welcome {user.firstName}!</h1>
				<h2 className='userInfo__text'>{user.role}</h2>
				<h2 className='userInfo__text'>{user.email}</h2>
				<h2 className='userInfo__text'>{user.telephone}</h2>
			</div>
		);
	};

	return (
		<>
		<div className='userInfo'>
			{userInfo}
			<Card user={user} link='/edit-information' />
		</div>
		</>
	)
}

export default Home