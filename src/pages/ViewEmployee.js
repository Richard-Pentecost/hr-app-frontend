import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import axios from 'axios';
import "../style/Home.scss";
import { URL } from '../utils/Constants';
import TokenManager from '../utils/token-manager';
import BreadcrumbBar from '../components/BreadcrumbBar';
import Heading from '../components/Heading';
import LoadingBox from '@govuk-react/loading-box';

const ViewEmployee = ({currentEmployeeId}) => {
		const [currentEmployee, setCurrentEmployee] = useState('');
		const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				setLoading(true);
				const axiosHeaders = { headers: { Authorization: 'Bearer ' + TokenManager.getToken() }};
				const response = await axios.get(`${URL}/user/${currentEmployeeId}`, axiosHeaders);
				setCurrentEmployee(response.data.user);
				setLoading(false);
			} catch (error) {
				setLoading(false);
				console.log(error);
			}
		}
		fetchUser();

	}, [setCurrentEmployee, currentEmployeeId]);

	return (
		<>
            <BreadcrumbBar page = 'Employee Information' prevPages = {[{name:'View Employees', link: '/employees-list'}]} />
            <div className='headingContainer'>
                <Heading>Employee Information</Heading>
            </div>
			<LoadingBox
				loading={loading}
				backgroundColor={'#fff'}
				timeIn={800}
				timeOut={200}
				backgroundColorOpacity={0.85}
				spinnerColor={'#000'}
			>
				<div className='userInfo'>
					<Card user={currentEmployee} link='/edit-employee' />
				</div>
			</LoadingBox>
		</>
	)
}

export default ViewEmployee;