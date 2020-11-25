import React, { useEffect, useState } from 'react';
import { URL } from '../utils/Constants';
import axios from 'axios';
import BreadcrumbBar from '../components/BreadcrumbBar';
import Heading from '../components/Heading';
import Form from '../components/Form';
import TokenManager from '../utils/token-manager';
import { withRouter } from 'react-router';
import LoadingWrapper from '../components/LoadingWrapper';
import '../style/CreateEmployee.scss';

const EditEmployee = ({history, match, isLoggedIn}) => {
    const [currentEmployee, setCurrentEmployee] = useState({});
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
        };
        if (employeeId) {
            fetchUser();
        }
    }, [setCurrentEmployee, match.params.userId, employeeId]);
    

    const handleInputChange = event => {
        console.log(event);
        if (event.target === undefined) {
            setCurrentEmployee({
                ...currentEmployee,
                'doB': event,
            })
        } else {
            setCurrentEmployee({
                ...currentEmployee,
                [event.target.name]: event.target.value}
            );
        }
        
    }

    
    const handleSubmit = async (event) => {

        event.preventDefault();
        try {
            setLoading(true);
            const axiosHeaders = { headers: { Authorization: 'Bearer ' + TokenManager.getToken() }};
            const response = await axios.put(`${URL}/user/${employeeId}`, currentEmployee, axiosHeaders );
            setCurrentEmployee(response.data.user);
            setLoading(false);
            history.push(`/view-employee/${employeeId}`);
        } catch (error) {
            setLoading(false);
            console.log(error.response);
        }
    }

    const { firstName, surname, email , role, location, address, nextOfKin, doB, telephone, adminLevel, salary } = currentEmployee;
    const formArr = [
        { type: 'text', value: firstName, name: 'firstName', label: 'First name' },
        { type: 'text', value: surname, name: 'surname', label: 'Surname' },
        { type: 'text', value: role, name: 'role', label: 'Role' },
        { type: 'email', value: email, name: 'email', label: 'Email' },
        { type: 'text', value: telephone, name: 'telephone', label: 'Telephone' },
        { type: 'date', value: doB, name: 'doB', label: 'Date of Birth' },
        { type: 'select', value: adminLevel, name: 'adminLevel', label: 'Admin Level' },  
        { type: 'text', value: nextOfKin, name: 'nextOfKin', label: 'Next of Kin' },
        { type: 'text', value: salary, name: 'salary', label: 'Salary' },
        { type: 'text', value: location, name: 'location', label: 'Location' },
        { type: 'text', value: address, name: 'address', label: 'Address' },
    ];

    return (
        <>
            <BreadcrumbBar page='Edit Employee' prevPages={[ {name:'Employee Information', link: `/view-employee/${employeeId}` }]}/>
            <div className='headingContainer'>
                <Heading>Edit Employee</Heading>
            </div>
            <LoadingWrapper loading={loading}>
                <div className='formContainer'>
                    <Form 
                        formArr={formArr}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
                        btnText='Save'
                    />
                </div>
            </LoadingWrapper>
        </>
    );
}

export default withRouter(EditEmployee);