import React, { useEffect , useState } from 'react';
import Card from '../components/Card';
import ContactCard from '../components/ContactCard';
import axios from 'axios';
import LoadingWrapper from '../components/LoadingWrapper';
import ErrorPage from '../pages/ErrorPage';
import "../style/Home.scss";
import { URL } from '../utils/Constants';
import TokenManager from '../utils/token-manager';
import GridRow from '@govuk-react/grid-row';
import GridCol from '@govuk-react/grid-col';
import QuickLinksCard from '../components/QuickLinksCard';

const Home = ({user, setUser}) => {
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

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
				let errorMessage;
				const { data, status } = error.response;
				data.message ? errorMessage = data.message : errorMessage = data.title;
				setErrorMessage({message: errorMessage, status: status});
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

	if (errorMessage) return <ErrorPage errorMessage={errorMessage} />
	return (
		<>
			<LoadingWrapper loading={loading}>
				<div className='userInfo'>
					{userInfo}
					<GridRow>
						<GridCol>
							{user && <Card user={user} link='/edit-information' />}
						</GridCol>
						<GridCol>
							{user && <ContactCard user={user} link='/edit-information' />}
						</GridCol>
                        <GridCol setWidth="one-quarter">
							<QuickLinksCard adminLevel={user.adminLevel}/>
						</GridCol>
					</GridRow>
				</div>
			</LoadingWrapper>
		</>
	)
}

export default Home