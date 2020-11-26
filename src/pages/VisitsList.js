import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { URL } from '../utils/Constants';
import TokenManager from '../utils/token-manager';
import BreadcrumbBar from '../components/BreadcrumbBar';
import Heading from '../components/Heading';
import '../style/CreateEmployee.scss';
import LoadingWrapper from '../components/LoadingWrapper';
import SearchBar from '../components/SearchBar';
import VisitTable from '../components/VisitTable';

const VisitsList = ({history, adminLevel, email, setCurrentVisitId, setUser}) => {
    const [visitors, setVisitors] = useState([]);
    const [filteredVisitors, setFilteredVisitors] = useState([]);
    const [searchField, setSearchField] = useState('');
    const [deleteFlag, setDeleteFlag] = useState(false);
    const [loading, setLoading] = useState(false);

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
                console.log(error.response);
            }
        };
        fetchUser();
    }, [setUser]);

    const handleClick = (id) => {
        setCurrentVisitId(id);
        history.push(`./view-visit/${id}`);
    };
    
    const deleteHandler = async (e, id) => {
        e.stopPropagation();
        try {
            await axios.delete(`${URL}/visitor/${id}`);
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
                setVisitors(response.data.visitors);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error.response);
            }

        }
        if (adminLevel && email) {
            fetchVisitsList();
        }

    },[deleteFlag, adminLevel, email])

    useEffect(() => {
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
            <LoadingWrapper loading={loading}>
                <div align='center'>
                    <VisitTable 
                        visitors={filteredVisitors}
                        handleClick={handleClick}
                        deleteHandler={deleteHandler}
                        adminLevel={adminLevel}
                    />
                </div>
            </LoadingWrapper>
        </>
    )
}

export default VisitsList;
