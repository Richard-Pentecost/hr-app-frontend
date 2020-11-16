import React, { useEffect, } from 'react';
import { URL } from '../utils/Constants';
import axios from 'axios';
import BreadcrumbBar from '../components/BreadcrumbBar';
import Heading from '../components/Heading';
import Form from '../components/Form';

import '../style/CreateEmployee.scss';

const EditInformation = ({history, isLoggedIn, id, user, setUser}) => {
	useEffect(() => {
		const fetchUser = async () => {
			try {
                const response = await axios.get(`${URL}/user/${id}`);
				const { firstName, surname, role, email, telephone, doB, permissionLevel, address, nextOfKin, salary, location } = response.data;
				setUser({
					firstName,
					surname,
					role,
					email,
					telephone,
					doB,
					permissionLevel,
					nextOfKin,
					salary,
					location,
					address,
				});
			} catch (error) {
				console.log(error);
			}
		};
		fetchUser();
    }, [setUser, id]);
    

    const handleInputChange = event => {
        if (event.target === undefined) {
            setUser({
                ...user,
                'doB': event,
            })
        } else {
            setUser({
                ...user,
                [event.target.name]: event.target.value}
            );
        }
        
    }

    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`${URL}/user/${id}`, user );
            console.log(response.data);
            const { firstName, surname, role, email, telephone, doB, permissionLevel, address, nextOfKin, salary, location } = response.data;

            setUser({
                firstName,
                surname,
                role,
                email,
                telephone,
                doB,
                permissionLevel,
                nextOfKin,
                salary,
                location,
                address,
            })
            
        } catch (error) {
            console.log(error.response);
        }
    }
    
    const { firstName, surname, email , role, location, address, nextOfKin, doB, telephone, permissionLevel, salary } = user;
    const formArr = [
        { type: 'text', value: firstName, name: 'firstName', label: 'First name' },
        { type: 'text', value: surname, name: 'surname', label: 'Surname' },
        { type: 'text', value: role, name: 'role', label: 'Role' },
        { type: 'email', value: email, name: 'email', label: 'Email' },
        { type: 'text', value: telephone, name: 'telephone', label: 'Telephone' },
        { type: 'date', value: doB, name: 'doB', label: 'Date of Birth' },
        { type: 'select', value: permissionLevel, name: 'permissionLevel', label: 'Permission Level' },  
        { type: 'text', value: nextOfKin, name: 'nextOfKin', label: 'Next of Kin' },
        { type: 'text', value: salary, name: 'salary', label: 'Salary' },
        { type: 'text', value: location, name: 'location', label: 'Location' },
        { type: 'text', value: address, name: 'address', label: 'Address' },

    ];

    return (
        <>
            <BreadcrumbBar page='Edit Information' />
            <div className='headingContainer'>
                <Heading>Edit Information</Heading>
            </div>
            <div className='formContainer'>
                <Form 
                    formArr={formArr}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    btnText='Save'
                />
            </div>
        </>
    );
}

export default EditInformation