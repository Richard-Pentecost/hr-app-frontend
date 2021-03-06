import React, { useEffect, useState } from 'react';
import { URL } from '../utils/Constants';
import axios from 'axios';
import BreadcrumbBar from '../components/BreadcrumbBar';
import LoadingWrapper from '../components/LoadingWrapper';
import Heading from '../components/Heading';
import Form from '../components/Form';
import TokenManager from '../utils/token-manager';
import { withRouter } from 'react-router';

import '../style/CreateEmployee.scss';

const EditInformation = ({history, user, setUser}) => {
    const [loading, setLoading] = useState(false);

	useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const axiosHeaders = { headers: { Authorization: 'Bearer ' + TokenManager.getToken() }};
                const decodedToken = TokenManager.getTokenPayload();
                const id = decodedToken.unique_name;
                const response = await axios.get(`${URL}/user/${id}`, axiosHeaders);
                setUser(response.data.user);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                // console.log(error.response);
            }
        };
        if (user.firstName === '') {
            fetchUser();
        }
    }, [setUser, user]);
    

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
            setLoading(true);
            const axiosHeaders = { headers: { Authorization: 'Bearer ' + TokenManager.getToken() }};
            const response = await axios.put(`${URL}/user/${user.userId}`, user, axiosHeaders);
            setUser(response.data.user);
            setLoading(false);
            history.push('/home');
        } catch (error) {
            setLoading(false);
            //console.log(error.response);
        }
    }

    let formArr = null;
    if (user.firstName !== '') {
        const { firstName, surname, telephone, doB, nextOfKin, address  } = user;
        formArr = [
            { type: 'text', value: firstName, name: 'firstName', label: 'First name' },
            { type: 'text', value: surname, name: 'surname', label: 'Surname' },
            { type: 'text', value: telephone, name: 'telephone', label: 'Telephone' },
            { type: 'date', value: doB, name: 'doB', label: 'Date of Birth' },
            { type: 'text', value: nextOfKin, name: 'nextOfKin', label: 'Next of Kin' },
            { type: 'text', value: address, name: 'address', label: 'Address' },
        ];
    };

    return (
        <>
            <BreadcrumbBar page='Edit Information' />
            <div className='headingContainer'>
                <Heading>Edit Information</Heading>
            </div>
            <LoadingWrapper loading={loading}>
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
            </LoadingWrapper>
        </>

    );
}

export default withRouter(EditInformation);