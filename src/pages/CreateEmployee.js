import React, { useState } from 'react';
import Heading from '../components/Heading';
import BreadcrumbBar from '../components/BreadcrumbBar';
import Form from '../components/Form';
import '../style/CreateEmployee.scss';

const initialState = {
  firstName: '',
  surname: '',
  email: '',
  role: '',
  location: '',
  manager: '',
  permissionLevel: '',
  password: '',
  checkPassword:'',
};

const CreateEmployee = () => {
  const [newUser, setNewUser] = useState(initialState)
  
  const handleInputChange = event => {
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log('An http request will go here');
    setNewUser(initialState);
  }

  const { firstName, surname, email , role, location, manager, permissionLevel, password, checkPassword } = newUser;
  const formArr = [
    { type: 'text', value: firstName, name: 'firstName', label: 'First name' },
    { type: 'text', value: surname, name: 'surname', label: 'Surname' },
    { type: 'email', value: email, name: 'email', label: 'Email' },
    { type: 'text', value: role, name: 'role', label: 'Role' },
    { type: 'text', value: location, name: 'location', label: 'Location' },
    { type: 'text', value: manager, name: 'manager', label: 'Manager' },
    { type: 'select', value: permissionLevel, name: 'permissionLevel', label: 'Permission Level' },
    { type: 'password', value: password, name: 'password', label: 'Password' },
    { type: 'password', value: checkPassword, name: 'checkPassword', label: 'Confirm Password' },
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

export default CreateEmployee;
