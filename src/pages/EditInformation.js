import React, { useEffect, useState } from 'react';
import { URL } from '../utils/Constants';
import axios from 'axios';
import BreadcrumbBar from '../components/BreadcrumbBar';
import Heading from '../components/Heading';
import Form from '../components/Form';
import TokenManager from '../utils/token-manager';
import { withRouter } from 'react-router';

import '../style/CreateEmployee.scss';

const EditInformation = ({history, user, setUser}) => {
    const [confirmPassword, setConfirmPassword] = useState('');

	useEffect(() => {
        const fetchUser = async () => {
            try {
                const decodedToken = TokenManager.getTokenPayload();
                const id = decodedToken.unique_name;
                const response = await axios.get(`${URL}/user/${id}`);
                setUser(response.data.user);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
    }, []);
    

    const handleInputChange = event => {
        if (event.target.name === 'confirmPassword') {
            setConfirmPassword(event.target.value);
        } else {
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
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`${URL}/user/${user.userId}`, user );
            setUser(response.data.user);
            history.push('/home');
        } catch (error) {
            console.log(error.response);
        }
    }

    let formArr = null;
    if (user.firstName !== '') {
        const { firstName, surname, telephone, doB, nextOfKin, address, password  } = user;
        formArr = [
            { type: 'text', value: firstName, name: 'firstName', label: 'First name' },
            { type: 'text', value: surname, name: 'surname', label: 'Surname' },
            { type: 'text', value: telephone, name: 'telephone', label: 'Telephone' },
            { type: 'date', value: doB, name: 'doB', label: 'Date of Birth' },
            { type: 'text', value: nextOfKin, name: 'nextOfKin', label: 'Next of Kin' },
            { type: 'text', value: address, name: 'address', label: 'Address' },
            { type: 'password', value: password, name: 'password', label: 'Password' },
            { type: 'password', value: confirmPassword, name: 'confirmPassword', label: 'Confirm Password' },
        ];
    };

    return (
        <>
            <BreadcrumbBar page='Edit Information' />
            <div className='headingContainer'>
                <Heading>Edit Information</Heading>
            </div>
            <div className='formContainer'>
                {formArr &&
                    <Form 
                        formArr={formArr}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
                        btnText='Save'
                    />
                }       
            </div>
        </>

    );
}

export default withRouter(EditInformation);