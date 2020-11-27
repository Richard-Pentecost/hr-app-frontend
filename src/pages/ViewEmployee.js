import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import ContactCard from '../components/ContactCard';
import axios from 'axios';
import { withRouter } from 'react-router';
import "../style/Home.scss";
import { URL } from '../utils/Constants';
import TokenManager from '../utils/token-manager';
import BreadcrumbBar from '../components/BreadcrumbBar';
import Heading from '../components/Heading';
import LoadingWrapper from '../components/LoadingWrapper';
import ErrorPage from '../pages/ErrorPage';
import GridRow from '@govuk-react/grid-row';
import GridCol from '@govuk-react/grid-col';

const ViewEmployee = ({ match }) => {
		const [currentEmployee, setCurrentEmployee] = useState('');
		const [loading, setLoading] = useState(false);
		const [employeeId, setEmployeeId] = useState('');
		const [errorMessage, setErrorMessage] = useState('');
	
	useEffect(() => {
		setEmployeeId(match.params.userId);
		const fetchUser = async () => {
			try {
				setLoading(true);
				const axiosHeaders = { headers: { Authorization: 'Bearer ' + TokenManager.getToken() }};
				const response = await axios.get(`${URL}/user/${employeeId}`, axiosHeaders);
				setCurrentEmployee(response.data.user);
				setLoading(false);
			} catch (error) {
				setLoading(false);
				let errorMessage;
				const { data, status } = error.response;
				data.message ? errorMessage = data.message : errorMessage = data.title;
				setErrorMessage({message: errorMessage, status: status});
			}
		}
		if (employeeId) {
			fetchUser();
		}
	}, [setCurrentEmployee, match.params.userId, employeeId]);

	if (errorMessage) return <ErrorPage errorMessage={errorMessage} />
	return (
		<>
			<BreadcrumbBar page = 'Employee Information' prevPages = {[{name:'View Employees', link: '/employees-list'}]} />
			<div className='headingContainer'>
					<Heading>Employee Information</Heading>
			</div>
			<LoadingWrapper loading={loading}>
				<div className='userInfo'>
					<GridRow>
						<GridCol>
							{currentEmployee && <Card user={currentEmployee} link={`/view-employee/${employeeId}/edit-employee`} />}
						</GridCol>
						<GridCol>
							{currentEmployee && <ContactCard user={currentEmployee} link={`/view-employee/${employeeId}/edit-employee`} />}
						</GridCol>
					</GridRow>
				</div>
			</LoadingWrapper>
		</>
	)
}

export default withRouter(ViewEmployee);