import React, { useState } from 'react';
import Heading from '../components/Heading';
import BreadcrumbBar from '../components/BreadcrumbBar';
import Form from '../components/Form';
import '../style/CreateEmployee.scss';
import { URL } from '../utils/Constants';
import axios from 'axios';
import { withRouter } from 'react-router';

const initialState = {
  firstName: '',
  surname: '',
  email: '',
  role: '',
  address: '',
  telephone:'',
  doB:new Date(),
  nextOfKin:'',
  salary:'',
  location: '',
  manager: '',
  adminLevel: '',
};

const CreateEmployee = ({history, setCurrentEmployeeId}) => {
  const [newUser, setNewUser] = useState(initialState)
  
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
      const response = await axios.post(`${URL}/userdb`, newUser);
      setCurrentEmployeeId(response.data.user.userId);
      setNewUser({initialState});
      history.push('/view-employee');
    } catch (error) {

    }
    
  }

  const { firstName, surname, email , role, location, address, nextOfKin, doB, telephone, adminLevel, salary } = newUser;
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
      <BreadcrumbBar page='Create Employee' />
      <div className='headingContainer'>
        <Heading>Create Employee</Heading>
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
  )
}

export default withRouter(CreateEmployee);
