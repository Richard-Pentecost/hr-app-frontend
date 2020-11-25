import React, { useEffect , useState } from 'react';
import Card from '../components/Card';
import axios from 'axios';
import LoadingWrapper from '../components/LoadingWrapper';
import "../style/Home.scss";
import { URL } from '../utils/Constants';
import TokenManager from '../utils/token-manager';

const Home = ({user, setUser}) => {
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchUser = async () => {
			const decodedToken = TokenManager.getTokenPayload();
			const id = decodedToken.unique_name;
			try {
				setLoading(true);
				const axiosHeaders = { headers: { Authorization: 'Bearer ' + TokenManager.getToken() }};
				const response = await axios.get(`${URL}/user/${id}`, axiosHeaders);
				setUser(response.data.user);
				setLoading(false);
			} catch (error) {
				setLoading(false);
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
			<LoadingWrapper loading={loading}>
				<div className='userInfo'>
					{userInfo}
					{user && <Card user={user} link='/edit-information' />}
				</div>
			</LoadingWrapper>
		</>
	)
}

export default Home