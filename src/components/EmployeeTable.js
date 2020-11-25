import React from 'react';
import Table from '@govuk-react/table';
    
const EmployeeTable = ({users, handleClick, deleteHandler, adminLevel}) => {
    return (
        <>
          <Table>
            <Table.Row>
              <Table.CellHeader>First Name</Table.CellHeader>
              <Table.CellHeader>Surname</Table.CellHeader>
              <Table.CellHeader>Email</Table.CellHeader>
              <Table.CellHeader>Role</Table.CellHeader>
              <Table.CellHeader>Location</Table.CellHeader>
              {adminLevel === "Admin" && <Table.CellHeader></Table.CellHeader>}
            </Table.Row>
              {users.map((user, index)=>(
              <Table.Row onClick={()=>handleClick(user.userId)} className='tableRow' key={index}>
                <Table.Cell>{user.firstName}</Table.Cell>
                <Table.Cell>{user.surname}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.role}</Table.Cell>
                <Table.Cell>{user.location}</Table.Cell>
                {adminLevel === "Admin" && <Table.Cell><button onClick={(e)=>deleteHandler(e, user.userId)}>Delete</button></Table.Cell>}
            </Table.Row>))}
          </Table>
        </>
    );
};

export default EmployeeTable;
