import React, { useState } from 'react';
import Heading from '../components/Heading';
import BreadcrumbBar from '../components/BreadcrumbBar';
import Form from '../components/Form';
import '../style/CreateEmployee.scss';
import { URL } from '../utils/Constants';
import TokenManager from '../utils/token-manager';
import axios from 'axios';
import LoadingBox from '@govuk-react/loading-box';

const initialState = {
  firstName: '',
  surname: '',
  email: '',
  role: '',
  telephone: '',
  employeeEmail: '',
  company: '',
  appointment: new Date().now,

};

const CreateVisit = ({history, setCurrentVisitId}) => {
  const [newVisit, setNewVisit] = useState(initialState)
  const [loading, setLoading] = useState(false);
  
  const handleInputChange = event => {
      console.log(event);
    if (event.target === undefined) {
      setNewVisit({
          ...newVisit,
          'appointment': event
      })
    } else {
      setNewVisit({
          ...newVisit,
          [event.target.name]: event.target.value}
      );
    }

  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setLoading(true);
      const axiosHeaders = { headers: { Authorization: 'Bearer ' + TokenManager.getToken() }};
      const response = await axios.post(`${URL}/visitor`, newVisit, axiosHeaders);
      setCurrentVisitId(response.data.visit.visitorId);
      setNewVisit({initialState});
      setLoading(false);
      history.push('/view-visit');
    } catch (error) {
        setLoading(false);
        console.log(error);
    }
    
  }

  const { firstName, surname, company , role, telephone, email, employeeEmail, appointment } = newVisit;
  const formArr = [
    { type: 'text', value: firstName, name: 'firstName', label: 'First name' },
    { type: 'text', value: surname, name: 'surname', label: 'Surname' },
    { type: 'text', value: company, name: 'company', label: 'Company' },
    { type: 'text', value: role, name: 'role', label: 'Role' },
    { type: 'text', value: telephone, name: 'telephone', label: 'Telephone' },
    { type: 'email', value: email, name: 'email', label: 'Email' },
    { type: 'email', value: employeeEmail, name: 'employeeEmail', label: 'Employee Email' },
    { type: 'dateTime', value: appointment, name: 'appointment', label: 'Appointment' }
];

  return (
    <>
      <BreadcrumbBar page='Create Visit' />
      <div className='headingContainer'>
        <Heading>Create Visit</Heading>
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
        <Form 
          formArr={formArr}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          btnText='Save'
        />
      </div>
      </LoadingBox>
    </>
  )
}

export default CreateVisit;