import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import Table from '@govuk-react/table';
import Breadcrumbs from '@govuk-react/breadcrumbs';
import { URL } from '../utils/Constants';
import '../style/EmployeesList.scss';

const EmployeesList = ({history, setCurrentEmployeeId, currentEmployeeId}) => {
  const [users, setUsers] = useState([]);
  //hardcoded id below until database is up
  const [idArray, setIdArray] = useState(["c0a68046-617e-4927-bd9b-c14ce8f497e1", "18712a4f-744e-4e7c-a191-395fa832518b", "6d56e5bd-bba7-4026-9e3d-383f2c2f8d4d"]);
  
  const handleClick = (id) => {
    setCurrentEmployeeId(id);
    history.push('./view-employee');
  };

  const deleteHandler = async (e, id) => {
    e.stopPropagation();

    try {
      const response = await axios.delete(`${URL}/user/${id}`);
      setCurrentEmployeeId(id);
    } catch (error) {
      console.log(error);
    }
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
          <Table.Row onClick={(id)=>handleClick(idArray[index])} className='tableRow' id={idArray[index]}>
            <Table.Cell>{user.firstName}</Table.Cell>
            <Table.Cell>{user.surname}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.role}</Table.Cell>
            <Table.Cell>{user.location}</Table.Cell>
            <Table.Cell><button onClick={(e)=>deleteHandler(e, idArray[index])} id={idArray[index]}>Delete</button></Table.Cell>
          </Table.Row>))}
      </Table>
    </div>
  );
};

export default withRouter(EmployeesList);
