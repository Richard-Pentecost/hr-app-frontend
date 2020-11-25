import React, { useState } from 'react';
import Heading from '../components/Heading';
import BreadcrumbBar from '../components/BreadcrumbBar';
import Form from '../components/Form';
import '../style/CreateEmployee.scss';
import { URL } from '../utils/Constants';
import TokenManager from '../utils/token-manager';
import axios from 'axios';
import LoadingWrapper from '../components/LoadingWrapper';
import { withRouter } from 'react-router';

const initialState = {
  firstName: '',
  surname: '',
  email: '',
  role: '',
  salary:'',
  location: '',
  managerEmail: '',
  adminLevel: '',
  password: '',
  confirmPassword:''
};

const CreateEmployee = ({history, setCurrentEmployeeId}) => {
  const [newUser, setNewUser] = useState(initialState);
  const [loading, setLoading] = useState(false);
  
  const handleInputChange = event => {
    if (event.target === undefined) {
      setNewUser({
          ...newUser,
          'doB': event
      })
    } else {
      setNewUser({
          ...newUser,
          [event.target.name]: event.target.value}
      );
    }

  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setLoading(true);
      const {confirmPassword, ...userObj}  = newUser;
      const axiosHeaders = { headers: { Authorization: 'Bearer ' + TokenManager.getToken() }};
      const response = await axios.post(`${URL}/user`, userObj, axiosHeaders);
      setCurrentEmployeeId(response.data.user.userId);
      setNewUser({initialState});
      setLoading(false);
      history.push('/view-employee');
    } catch (error) {
        setLoading(false);
        console.log(error);
    }
    
  }

  const { firstName, surname, email , role, location, adminLevel, salary, password, managerEmail, confirmPassword } = newUser;
  const formArr = [
    { type: 'text', value: firstName, name: 'firstName', label: 'First name' },
    { type: 'text', value: surname, name: 'surname', label: 'Surname' },
    { type: 'text', value: role, name: 'role', label: 'Role' },
    { type: 'email', value: email, name: 'email', label: 'Email' },
    { type: 'email', value: managerEmail, name: 'managerEmail', label: 'Manager Email' },
    { type: 'select', value: adminLevel, name: 'adminLevel', label: 'Admin Level' },  
    { type: 'text', value: salary, name: 'salary', label: 'Salary' },
    { type: 'text', value: location, name: 'location', label: 'Location' },
    { type: 'password', value: password, name: 'password', label: 'Password' },
    { type: 'password', value: confirmPassword, name: 'confirmPassword', label: 'Confirm Password' },

  ];

  return (
    <>
      <BreadcrumbBar page='Create Employee' />
      <div className='headingContainer'>
        <Heading>Create Employee</Heading>
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
  )
}

export default withRouter(CreateEmployee);
