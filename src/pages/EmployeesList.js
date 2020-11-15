import React from 'react'
import { Link } from 'react-router-dom';
import Table from '@govuk-react/table';
import Breadcrumbs from '@govuk-react/breadcrumbs';
import '../style/EmployeesList.scss'

const EmployeesList = () => {

  const handleClick = () => {
    console.log('clicked')
  };

  const deleteHandler = event => {
    event.stopPropagation();
    console.log('DELETE');
  };

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
        <Table.Row onClick={handleClick} className='tableRow'>
          <Table.Cell>Duncan</Table.Cell>
          <Table.Cell>Carter</Table.Cell>
          <Table.Cell>duncan.carter@skills.com</Table.Cell>
          <Table.Cell>Academy Engineer</Table.Cell>
          <Table.Cell>Manchester</Table.Cell>
          <Table.Cell><button onClick={deleteHandler}>Delete</button></Table.Cell>
        </Table.Row>
          <Table.Row onClick={handleClick} className='tableRow'>
          <Table.Cell>Richard</Table.Cell>
          <Table.Cell>Pentecost</Table.Cell>
          <Table.Cell>richard.pentecost@skills.com</Table.Cell>
          <Table.Cell>Academy Engineer</Table.Cell>
          <Table.Cell>Manchester</Table.Cell>
          <Table.Cell><button onClick={deleteHandler}>Delete</button></Table.Cell>
        </Table.Row>
      </Table>
    </div>
  );
};

export default EmployeesList;
