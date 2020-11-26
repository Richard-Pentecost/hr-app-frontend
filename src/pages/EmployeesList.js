import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import BreadcrumbBar from '../components/BreadcrumbBar';
import { URL } from '../utils/Constants';
import TokenManager from '../utils/token-manager';
import '../style/EmployeesList.scss';
import Heading from '../components/Heading';
import LoadingWrapper from '../components/LoadingWrapper';
import EmployeeTable from '../components/EmployeeTable';
import SearchBar from '../components/SearchBar';

const EmployeesList = ({history, email, adminLevel, setUser, userId}) => {
  const [users, setUsers] = useState([]);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchField, setSearchField] = useState('');
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
            //console.log(error.response);
        }
    };
    fetchUser();
}, [setUser]);

  const handleClick = (id) => {
    history.push(`./view-employee/${id}`);
  };

  const deleteHandler = async (e, id) => {
    e.stopPropagation();
    try {
      setLoading(true)
      const axiosHeaders = { headers: { Authorization: 'Bearer ' + TokenManager.getToken(), adminLevel }};
      await axios.delete(`${URL}/user/${id}`, axiosHeaders);
      setDeleteFlag(!deleteFlag)
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // console.log(error.response);
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
        setUsers(response.data.users.filter(currentUser=>currentUser.userId!==userId));
        setLoading(false);
			} catch (error) {
        setLoading(false);
				// console.log(error.response);
			}
    };
    if (adminLevel && email) {
      fetchAllUsers();
    }
  }, [deleteFlag, adminLevel, email, userId]);

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
      
      <LoadingWrapper loading={loading}>
        { users && (
          <div align='center'>
            <EmployeeTable 
              users={filteredUsers} 
              handleClick={handleClick} 
              deleteHandler={deleteHandler} 
              adminLevel={adminLevel}
            />
          </div>
        )}
      </LoadingWrapper>
    </>
  );
};

export default withRouter(EmployeesList);
