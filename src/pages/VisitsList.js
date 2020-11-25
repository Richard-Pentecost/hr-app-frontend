import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { URL } from '../utils/Constants';
import TokenManager from '../utils/token-manager';
import BreadcrumbBar from '../components/BreadcrumbBar';
import Heading from '../components/Heading';
import '../style/CreateEmployee.scss';
import LoadingBox from '@govuk-react/loading-box';
import SearchBar from '../components/SearchBar';
import VisitTable from '../components/VisitTable';

const VisitsList = ({history, adminLevel, email, setCurrentVisitId}) => {
    const [visitors, setVisitors] = useState([]);
    const [filteredVisitors, setFilteredVisitors] = useState([]);
    const [searchField, setSearchField] = useState('');
    const [deleteFlag, setDeleteFlag] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const handleClick = (id) => {
        setCurrentVisitId(id);
        history.push('./view-visit');
    };
    
    const deleteHandler = async (e, id) => {
        e.stopPropagation();
        try {
            const response = await axios.delete(`${URL}/visitor/${id}`);
            console.log(response);
            setDeleteFlag(!deleteFlag)
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchVisitsList = async () => {
            try {
                setLoading(true);
                const axiosHeaders = {
                    headers: {
                        Authorization: 'Bearer ' + TokenManager.getToken(),
                        adminLevel,
                        email,
                    },
                };
                const response = await axios.get(`${URL}/visitor`, axiosHeaders);
                console.log(response);
                setVisitors(response.data.visitors);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }

        }
        fetchVisitsList();

    },[deleteFlag, adminLevel, email])

    useEffect(() => {
        console.log(visitors);
        const filtered = visitors.filter(visitor => {
            const name = `${visitor.firstName.toLowerCase()} ${visitor.surname.toLowerCase()}`;
            return name.includes(searchField.toLowerCase());
        });
        setFilteredVisitors(filtered);
    }, [searchField, visitors]);

    return(
        <>
            <BreadcrumbBar page='View Visits'/>
            <div className='headingContainer'>
                <Heading style={{flexDirection:'row'}}>
                    <SearchBar setSearchField={setSearchField} placeholder="Search Visits" heading='View Visits' />
                </Heading>
            </div>
            <LoadingBox
                loading={loading}
                backgroundColor={'#fff'}
                timeIn={800}
                timeOut={200}
                backgroundColorOpacity={0.85}
                spinnerColor={'#000'}
            >
                <div align='center'>
                    <VisitTable 
                        visitors={filteredVisitors}
                        handleClick={handleClick}
                        deleteHandler={deleteHandler}
                        adminLevel={adminLevel}
                    />
                </div>
            </LoadingBox>
        </>
    )
}

export default VisitsList;
