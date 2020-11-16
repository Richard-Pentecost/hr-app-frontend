import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Table from '@govuk-react/table';
import Breadcrumbs from '@govuk-react/breadcrumbs';
import { URL } from '../utils/Constants';
import '../style/EmployeesList.scss';

const EmployeesList = () => {
  const [users, setUsers] = useState([]);
  const handleClick = () => {
    console.log('clicked')
  };

  const deleteHandler = event => {
    event.stopPropagation();
    console.log('DELETE');
  };

  useEffect(() => {
		const fetchAllUsers = async () => {
			try {
        const response = await axios.get(`${URL}/user/all`);
	
        setUsers(response.data.users);
        console.log(users)
			} catch (error) {
				console.log(error);
			}
		};
		fetchAllUsers();
    }, []);

  return (
    <div className='employeeList'>
      <Breadcrumbs >
        <Breadcrumbs.Link as={Link} to='/home' className='breadcrumbs'>Home</Breadcrumbs.Link>
        Employees List
      </Breadcrumbs>
      <Table caption="List of Employees">
      
        <Table.Row>
          <Table.CellHeader>First Name</Table.CellHeader>
          <Table.CellHeader>Surname</Table.CellHeader>
          <Table.CellHeader>Email</Table.CellHeader>
          <Table.CellHeader>Role</Table.CellHeader>
          <Table.CellHeader>Location</Table.CellHeader>
          <Table.CellHeader></Table.CellHeader>
        </Table.Row>
          {users.map((user, index)=>(
          <Table.Row onClick={handleClick} className='tableRow' id={index}>
            <Table.Cell>{user.firstName}</Table.Cell>
            <Table.Cell>{user.surname}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.role}</Table.Cell>
            <Table.Cell>{user.location}</Table.Cell>
            <Table.Cell><button onClick={deleteHandler}>Delete</button></Table.Cell>
          </Table.Row>))}
      </Table>
    </div>
  );
};

export default EmployeesList;
