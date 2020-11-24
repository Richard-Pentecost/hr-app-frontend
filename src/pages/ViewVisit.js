import React, { useState, useEffect } from 'react';
import TokenManager from '../utils/token-manager';
import axios from 'axios';

const ViewVisit = ({currentVisitId}) => {
    const [currentVisit, setCurrentVisit] = useState('')

    useEffect(()=>{
        const fetchVisit = async()=>{

            try{
                const axiosHeaders = { headers: { Authorization: 'Bearer ' + TokenManager.getToken() }};
				const response = await axios.get(`${URL}/user/${currentVisitId}`, axiosHeaders);
				setCurrentVisit(response.data.visitor);
            }catch(error){

            }
        }
        fetchVisit();
    })
    return (
        <div>
            Hi
        </div>
    )
}

export default ViewVisit;