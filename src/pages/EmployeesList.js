import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import BreadcrumbBar from '../components/BreadcrumbBar';
import { URL } from '../utils/Constants';
import TokenManager from '../utils/token-manager';
import '../style/EmployeesList.scss';
import Heading from '../components/Heading';
import LoadingBox from '@govuk-react/loading-box';
import EmployeeTable from '../components/EmployeeTable';
import SearchBar from '../components/SearchBar';

const EmployeesList = ({history, setCurrentEmployeeId, currentEmployeeId, email, adminLevel}) => {
  const [users, setUsers] = useState([]);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleClick = (id) => {
    setCurrentEmployeeId(id);
    history.push('./view-employee');
  };

  const deleteHandler = async (e, id) => {
    e.stopPropagation();
    try {
      setLoading(true)
      const axiosHeaders = { headers: { Authorization: 'Bearer ' + TokenManager.getToken(), adminLevel }};
      const response = await axios.delete(`${URL}/user/${id}`, axiosHeaders);
      console.log(response);
      setDeleteFlag(!deleteFlag)
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
		const fetchAllUsers = async () => {
			try { 
        setLoading(true);
        const axiosHeaders = { 
          headers: { 
            Authorization: 'Bearer ' + TokenManager.getToken(),
            adminLevel,
            email,
          },
        };
        const response = await axios.get(`${URL}/user`, axiosHeaders);
        setUsers(response.data.users);
        setLoading(false);
			} catch (error) {
        setLoading(false);
				console.log(error);
			}
		};
		fetchAllUsers();
    }, [deleteFlag, adminLevel, email]);

    useEffect(() => {
      const filtered = users.filter(user => {
        const name = `${user.firstName.toLowerCase()} ${user.surname.toLowerCase()}`;
        return name.includes(searchField.toLowerCase());
      });
      setFilteredUsers(filtered);
    }, [searchField, users]);

  return (
    <>
      <BreadcrumbBar page='View Employees'/>
      <div className='headingContainer'>
        <Heading style={{ flexDirection:'row' }}>
          <SearchBar setSearchField={setSearchField} placeholder="Search Employees" heading='View Employees' />
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
          <EmployeeTable 
            users={filteredUsers} 
            handleClick={handleClick} 
            deleteHandler={deleteHandler} 
            adminLevel={adminLevel}
          />
        </div>
      </LoadingBox>
    </>
  );
};

export default withRouter(EmployeesList);
