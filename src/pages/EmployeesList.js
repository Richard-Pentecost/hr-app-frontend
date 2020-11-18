import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import Table from '@govuk-react/table';
import Breadcrumbs from '@govuk-react/breadcrumbs';
import { URL } from '../utils/Constants';
import '../style/EmployeesList.scss';

const EmployeesList = ({history, setCurrentEmployeeId, currentEmployeeId}) => {
  const [users, setUsers] = useState([]);
  
  const handleClick = (id) => {
    setCurrentEmployeeId(id);
    history.push('./view-employee');
  };

  const deleteHandler = async (e, id) => {
    e.stopPropagation();

    try {
      const response = await axios.delete(`${URL}/userdb/${id}`);
      console.log(response);
      setCurrentEmployeeId(id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
		const fetchAllUsers = async () => {
			try {
        const response = await axios.get(`${URL}/userdb`);
	
        setUsers(response.data.users);
        console.log(users)
			} catch (error) {
				console.log(error);
			}
		};
		fetchAllUsers();
    }, [currentEmployeeId]);

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
  );
};

export default withRouter(EmployeesList);
