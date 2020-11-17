import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import axios from 'axios';
import "../style/Home.scss";
import { URL } from '../utils/Constants';
import BreadcrumbBar from '../components/BreadcrumbBar';
import Heading from '../components/Heading';

const ViewEmployee = ({currentEmployeeId}) => {
    const [currentEmployee, setCurrentEmployee] = useState('');
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await axios.get(`${URL}/user/${currentEmployeeId}`);
				setCurrentEmployee(response.data.user);
			} catch (error) {
				console.log(error);
			}
		}
		fetchUser();

	}, [setCurrentEmployee, currentEmployeeId]);

	return (
        
		<>
            <BreadcrumbBar page = 'Employee Information' prevPages = {[{name:'Employees List', link: '/employees-list'}]} />
            <div className='headingContainer'>
                <Heading>Employee Information</Heading>
            </div>
            <div className='userInfo'>
                <Card user={currentEmployee} link='/edit-employee' />
            </div>
		</>
	)
}

export default ViewEmployee;