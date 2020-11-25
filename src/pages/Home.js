import React, { useEffect , useState } from 'react';
import Card from '../components/Card';
import axios from 'axios';
import LoadingBox from '@govuk-react/loading-box';
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
				console.log(response.data.user);
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
			<LoadingBox
				loading={loading}
				backgroundColor={'#fff'}
				timeIn={800}
				timeOut={200}
				backgroundColorOpacity={0.85}
				spinnerColor={'#000'}
			>
				<div className='userInfo'>
					{userInfo}
					<Card user={user} link='/edit-information' />
				</div>
			</LoadingBox>
		</>
	)
}

export default Home