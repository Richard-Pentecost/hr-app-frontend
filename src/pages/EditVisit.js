import React, { useEffect, useState } from 'react';
import { URL } from '../utils/Constants';
import axios from 'axios';
import BreadcrumbBar from '../components/BreadcrumbBar';
import Heading from '../components/Heading';
import Form from '../components/Form';
import TokenManager from '../utils/token-manager';
import moment from 'moment';
import '../style/CreateEmployee.scss';
import LoadingBox from '@govuk-react/loading-box';

const EditVisit = ({history,currentVisitId}) => {
    const [currentVisit, setCurrentVisit] = useState({});
    const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchUser = async () => {
			try {
                setLoading(true);
                const axiosHeaders = { headers: { Authorization: 'Bearer ' + TokenManager.getToken() }};
                const response = await axios.get(`${URL}/visitor/${currentVisitId}`, axiosHeaders);
                setCurrentVisit(response.data.visit);
                setLoading(false);
			} catch (error) {
                setLoading(false);
				console.log(error);
			}
		};
		fetchUser();
    }, [setCurrentVisit, currentVisitId]);
    

    const handleInputChange = event => {
        console.log(event)
        if (event.target === undefined) {
            setCurrentVisit({
                ...currentVisit,
                'appointment': event,
            })
        } else {
            setCurrentVisit({
                ...currentVisit,
                [event.target.name]: event.target.value}
            );
        }
        
    }

    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const axiosHeaders = { headers: { Authorization: 'Bearer ' + TokenManager.getToken() }};
            const response = await axios.put(`${URL}/visitor/${currentVisitId}`, currentVisit, axiosHeaders );
            setCurrentVisit(response.data.visit);
            setLoading(false);
            history.push('/view-visit');
        } catch (error) {
            setLoading(false);
            console.log(error.response);
        }
    }

   
    const { firstName, surname, company , role, telephone, email, employeeEmail, appointment } = currentVisit;
        const formArr = [
            { type: 'text', value: firstName, name: 'firstName', label: 'First name' },
            { type: 'text', value: surname, name: 'surname', label: 'Surname' },
            { type: 'text', value: company, name: 'company', label: 'Company' },
            { type: 'text', value: role, name: 'role', label: 'Role' },
            { type: 'text', value: telephone, name: 'telephone', label: 'Telephone' },
            { type: 'email', value: email, name: 'email', label: 'Email' },
            { type: 'email', value: employeeEmail, name: 'employeeEmail', label: 'Employee Email' },
            { type: 'dateTime', value: moment(appointment).format('llll'), name: 'appointment', label: 'Appointment' },
        ];

    return (
        <>
            <BreadcrumbBar page='Edit Visit' prevPages={[ {name:'Visit Information', link: '/view-visit'} ]}/>
            <div className='headingContainer'>
                <Heading>Edit Visit</Heading>
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
    );
}

export default EditVisit;