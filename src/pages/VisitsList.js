import React, {useEffect, useState} from 'react';
// import axios from 'axios';
// import { URL } from '../utils/Constants';

const VisitsList = () => {

//     useEffect(() => {
//         const fetchVisitsList = async () => {
//             try {
//                 const axiosHeaders = {
//                     headers: {
//                         Authorization: 'Bearer ' + TokenManager.getToken(),
//                         adminLevel,
//                         email,
//                     },
//                 };
//                 const response = await axios.get(`${URL}/visitor`, axiosHeaders);
//             } catch (error) {
//                 console.log(error);
//             }

//         }
//         fetchVisitsList();

//     },[])

    return(
        <div>
            This is the visits Visits List
        </div>
    )
}

export default VisitsList;
