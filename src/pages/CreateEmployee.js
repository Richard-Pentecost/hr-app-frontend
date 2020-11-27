import React, { useState, useEffect } from 'react';
import Heading from '../components/Heading';
import BreadcrumbBar from '../components/BreadcrumbBar';
import Form from '../components/Form';
import '../style/CreateEmployee.scss';
import { URL } from '../utils/Constants';
import TokenManager from '../utils/token-manager';
import axios from 'axios';
import LoadingWrapper from '../components/LoadingWrapper';
import { withRouter } from 'react-router';
import ErrorPage from '../pages/ErrorPage';

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

const CreateEmployee = ({history, setUser, creatorsAdminLevel, setCurrentEmployeeId}) => {
  const [newUser, setNewUser] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState('');
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
            let errorMessage;
            const { data, status } = error.response;
            data.message ? errorMessage = data.message : errorMessage = data.title;
            setErrorMessage({message: errorMessage, status: status});
        }
    };
    fetchUser();
  }, [setUser]);

  const handleInputChange = event => {
    if (formErrorMessage) {
      setFormErrorMessage('');
    }
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

    if (newUser.password !== newUser.confirmPassword) {
      setFormErrorMessage('Your passwords do not match');
      return;
    };
    try {
      setLoading(true);
      const {confirmPassword, ...userObj}  = newUser;
      const axiosHeaders = { 
        headers: { 
          Authorization: 'Bearer ' + TokenManager.getToken(),
          adminLevel: creatorsAdminLevel,
        }
      };
      const response = await axios.post(`${URL}/user`, userObj, axiosHeaders);
      setNewUser({initialState});
      setLoading(false);
      history.push(`/view-employee/${response.data.user.userId}`);
    } catch (error) {
        setLoading(false);
        setFormErrorMessage(error.response.data.message)
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

  if (errorMessage) return <ErrorPage errorMessage={errorMessage} />
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
            errorMessage={formErrorMessage}
          />
        </div>
      </LoadingWrapper>
    </>
  )
}

export default withRouter(CreateEmployee);
