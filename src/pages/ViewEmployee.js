import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import axios from 'axios';
import { withRouter } from 'react-router';
import "../style/Home.scss";
import { URL } from '../utils/Constants';
import TokenManager from '../utils/token-manager';
import BreadcrumbBar from '../components/BreadcrumbBar';
import Heading from '../components/Heading';
import LoadingWrapper from '../components/LoadingWrapper';

const ViewEmployee = ({ match }) => {
		const [currentEmployee, setCurrentEmployee] = useState('');
		const [loading, setLoading] = useState(false);
		const [employeeId, setEmployeeId] = useState('');
	
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
				console.log(error);
			}
		}
		if (employeeId) {
			fetchUser();
		}
	}, [setCurrentEmployee, match.params.userId, employeeId]);

	return (
		<>
			<BreadcrumbBar page = 'Employee Information' prevPages = {[{name:'View Employees', link: '/employees-list'}]} />
			<div className='headingContainer'>
					<Heading>Employee Information</Heading>
			</div>
			<LoadingWrapper loading={loading}>
				<div className='userInfo'>
					<Card user={currentEmployee} link={`/view-employee/${employeeId}/edit-employee`} />
				</div>
			</LoadingWrapper>
		</>
	)
}

export default withRouter(ViewEmployee);