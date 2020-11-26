import React, { useEffect, useState } from 'react';
import { URL } from '../utils/Constants';
import axios from 'axios';
import BreadcrumbBar from '../components/BreadcrumbBar';
import Heading from '../components/Heading';
import Form from '../components/Form';
import TokenManager from '../utils/token-manager';
import moment from 'moment';
import '../style/CreateEmployee.scss';
import LoadingWrapper from '../components/LoadingWrapper';

const EditVisit = ({history, match}) => {
    const [currentVisit, setCurrentVisit] = useState({});
    const [loading, setLoading] = useState(false);
    const [visitId, setVisitId] = useState('');

	useEffect(() => {
        setVisitId(match.params.visitId);
		const fetchUser = async () => {
			try {
                setLoading(true);
                const axiosHeaders = { headers: { Authorization: 'Bearer ' + TokenManager.getToken() }};
                const response = await axios.get(`${URL}/visitor/${visitId}`, axiosHeaders);
                setCurrentVisit(response.data.visit);
                setLoading(false);
			} catch (error) {
                setLoading(false);
				console.log(error);
			}
        };
        if (visitId) {
            fetchUser();
        }
    }, [setCurrentVisit, visitId, match.params.visitId]);
    

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
            const response = await axios.put(`${URL}/visitor/${visitId}`, currentVisit, axiosHeaders );
            setCurrentVisit(response.data.visit);
            setLoading(false);
            history.push(`/view-visit/${visitId}`);
        } catch (error) {
            setLoading(false);
            //console.log(error.response);
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
            <BreadcrumbBar page='Edit Visit' prevPages={[ {name:'Visit Information', link:`/view-visit/${visitId}`} ]}/>
            <div className='headingContainer'>
                <Heading>Edit Visit</Heading>
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
    );
}

export default EditVisit;