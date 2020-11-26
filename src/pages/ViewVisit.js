import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { URL } from '../utils/Constants';
import TokenManager from '../utils/token-manager';
import BreadcrumbBar from '../components/BreadcrumbBar';
import Heading from '../components/Heading';
import SignInCard from '../components/SignInCard';
import axios from 'axios';
import InfoCard from '../components/InfoCard';
import LoadingWrapper from '../components/LoadingWrapper';
import GridRow from '@govuk-react/grid-row';
import GridCol from '@govuk-react/grid-col';

const ViewVisit = ({match}) => {
    const [currentVisit, setCurrentVisit] = useState('');
    const [loading, setLoading] = useState(false);
    const [signInButtonClicked, setSignInButtonClicked] = useState(false);
    const [visitId, setVisitId] = useState('');
    
    useEffect(()=>{
        setVisitId(match.params.visitId);
        const fetchVisit = async()=>{
            try {
                setLoading(true);
                const axiosHeaders = { headers: { Authorization: 'Bearer ' + TokenManager.getToken() }};
                const response = await axios.get(`${URL}/visitor/${visitId}`, axiosHeaders);
                setCurrentVisit(response.data.visit);
                setLoading(false);
            } catch(error){
                setLoading(false);
				console.log(error);
            }
        }
        if (visitId) {
            fetchVisit();
        }
    }, [visitId, signInButtonClicked, match.params.visitId]);

    const signInHandler = async (event) =>{
        event.preventDefault();
        
        try {
            let visitObj = {visitorId: visitId};
            const axiosHeaders = { headers: { Authorization: 'Bearer ' + TokenManager.getToken() }};
            if (!currentVisit.signInFlag) {
                visitObj = {...visitObj, signInFlag: true, signOutFlag: false, signIn: moment(new Date().now).format()};

            } else {
                visitObj = {...visitObj, signInFlag: true, signOutFlag: true, signOut: moment(new Date().now).format()};
            }
            await axios.put(`${URL}/visitor/${visitId}`, visitObj, axiosHeaders); 
            setSignInButtonClicked(!signInButtonClicked);

        } catch (error) {
            console.log(error);
        }
    }
    
    const { firstName, surname, company , role, telephone, email, employeeEmail, appointment } = currentVisit;
    const infoArray = [
        { label: 'First Name', info: firstName },
        { label: 'Surname', info: surname },
        { label: 'Company', info: company },
        { label: 'Role', info: role },
        { label: 'Telephone', info: telephone },
        { label: 'Email', info: email },
        { label: 'Employee Email', info: employeeEmail },
        { label: 'Appointment', info: moment(appointment).format('llll') }
    ];

    return (
    	<>
            <BreadcrumbBar page = 'Visit Information' prevPages = {[{name:'View Visits', link: '/visits-list'}]} />
            <div className='headingContainer'>
                <Heading>Visit Information</Heading>
            </div>
            <LoadingWrapper loading={loading}>
                <div className='userInfo'>
                    <GridRow>
                        <GridCol>
                            <InfoCard infoArray={infoArray} link={`/view-visit/${visitId}/edit-visit`} />
                        </GridCol>
                        <GridCol>
                            <SignInCard signInHandler={signInHandler} currentVisit={currentVisit}/>
                        </GridCol>
                    </GridRow>
                </div>
            </LoadingWrapper>
		</>
    )
}

export default ViewVisit;