import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Table from '@govuk-react/table';
import BreadcrumbBar from '../components/BreadcrumbBar';
import { URL } from '../utils/Constants';
import TokenManager from '../utils/token-manager';
import '../style/EmployeesList.scss';
import Heading from '../components/Heading';

const EmployeesList = ({history, setCurrentEmployeeId, currentEmployeeId, email, adminLevel}) => {
  const [users, setUsers] = useState([]);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchField, setSearchField] = useState('');
  
  const handleClick = (id) => {
    setCurrentEmployeeId(id);
    history.push('./view-employee');
  };

  const deleteHandler = async (e, id) => {
    e.stopPropagation();
    console.log(currentEmployeeId);
    try {
      const axiosHeaders = { headers: { Authorization: 'Bearer ' + TokenManager.getToken(), adminLevel }};
      const response = await axios.delete(`${URL}/user/${id}`, axiosHeaders);
      console.log(response);
      setDeleteFlag(!deleteFlag)
      
    } catch (error) {
      console.log(error);
    }
  };

  const onSearchChange = (e) => {
    setSearchField(e.target.value); 
  };

  useEffect(() => {
    // console.log('*********************UseEffect*************');
    // console.log(currentEmployeeId);
		const fetchAllUsers = async () => {
			try { 
        const axiosHeaders = { 
          headers: { 
            Authorization: 'Bearer ' + TokenManager.getToken(),
            adminLevel,
            email,
          },
        };
        const response = await axios.get(`${URL}/user`, axiosHeaders);
        setUsers(response.data.users);
			} catch (error) {
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
      <BreadcrumbBar page='View Employees'/>useEffect()
      <div className='headingContainer'>
        <Heading>View Employees</Heading>
      </div>
      <input
		    type='search'
		    placeholder='Search Employees'
		    onChange={onSearchChange} 
		  />
      <div className='employeeTable'>
        <Table>
          <Table.Row>
            <Table.CellHeader>First Name</Table.CellHeader>
            <Table.CellHeader>Surname</Table.CellHeader>
            <Table.CellHeader>Email</Table.CellHeader>
            <Table.CellHeader>Role</Table.CellHeader>
            <Table.CellHeader>Location</Table.CellHeader>
            <Table.CellHeader></Table.CellHeader>
          </Table.Row>
            {filteredUsers.map((user, index)=>(
            <Table.Row onClick={()=>handleClick(user.userId)} className='tableRow' key={index}>
              <Table.Cell>{user.firstName}</Table.Cell>
              <Table.Cell>{user.surname}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.role}</Table.Cell>
              <Table.Cell>{user.location}</Table.Cell>
              <Table.Cell><button onClick={(e)=>deleteHandler(e, user.userId)}>Delete</button></Table.Cell>
            </Table.Row>))}
        </Table>
      </div>
    </>
  );
};

export default withRouter(EmployeesList);
