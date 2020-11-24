import React, { useEffect, useState } from 'react';
import { URL } from '../utils/Constants';
import axios from 'axios';
import BreadcrumbBar from '../components/BreadcrumbBar';
import LoadingBox from '@govuk-react/loading-box';
import Heading from '../components/Heading';
import Form from '../components/Form';
import TokenManager from '../utils/token-manager';
import { withRouter } from 'react-router';

import '../style/CreateEmployee.scss';

const initialState = {
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};

const ChangePassword = ({history, user, setUser}) => {
    const [password, setPassword] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

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
                console.log(error);
            }
        };
        fetchUser();
    }, []);
    

    const handleInputChange = event => {
          setPassword({
              ...password,
              [event.target.name]: event.target.value}
          );
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password.newPassword !== password.confirmNewPassword) {
          setErrorMessage('Your passwords do not match');
          return;
        }
        console.log('Backend to be done to allow request to work');

        // try {
        //     setLoading(true);
        //     const { confirmNewPassword, ...updateObj } = password;
        //     const axiosHeaders = { headers: { Authorization: 'Bearer ' + TokenManager.getToken() }};
        //     await axios.put(`${URL}/user/${user.userId}/password`, axiosHeaders, updateObj);
        //     setLoading(false);
        //     history.push('/home');
        // } catch (error) {
        //     setLoading(false);
        //     console.log(error.response);
        // }
      
    }

    
    const { oldPassword, newPassword, confirmNewPassword } = password;
    const formArr = [
        { type: 'password', value: oldPassword, name: 'oldPassword', label: 'Old Password' },
        { type: 'password', value: newPassword, name: 'newPassword', label: 'New Password' },
        { type: 'password', value: confirmNewPassword, name: 'confirmNewPassword', label: 'Confirm New Password' },
    ];

    return (
        <>
            <BreadcrumbBar page='Change Password' />
            <div className='headingContainer'>
                <Heading>Change Password</Heading>
            </div>
            <LoadingBox
              loading={loading}
              backgroundColor={'#fff'}
              timeIn={800}
              timeOut={200}
              backgroundColorOpacity={0.85}
              spinnerColor={'#000'}
            >
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
                <div>{errorMessage && <h1>{errorMessage}</h1>}</div>
            </LoadingBox>
        </>

    );
}

export default withRouter(ChangePassword);