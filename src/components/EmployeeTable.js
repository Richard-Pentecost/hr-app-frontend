import React from 'react';
import Table from '@govuk-react/table';
import Button from '@govuk-react/button';
    
const EmployeeTable = ({users, handleClick, deleteHandler, adminLevel}) => {
    const cellStyles = {padding: '10px'};
    return (
        <Table style={{width:'85%', justifyContent: 'center', margin:'40px 50px'}}>
          <Table.Row>
            <Table.CellHeader style={cellStyles}>First Name</Table.CellHeader>
            <Table.CellHeader style={cellStyles}>Surname</Table.CellHeader>
            <Table.CellHeader style={cellStyles}>Email</Table.CellHeader>
            <Table.CellHeader style={cellStyles}>Role</Table.CellHeader>
            <Table.CellHeader style={cellStyles}>Location</Table.CellHeader>
            {adminLevel === "Admin" && <Table.CellHeader style={cellStyles}></Table.CellHeader>}
          </Table.Row>
            {users.map((user, index)=>(
            <Table.Row onClick={()=>handleClick(user.userId)} className='tableRow' key={index}>
              <Table.Cell style={cellStyles}>{user.firstName}</Table.Cell>
              <Table.Cell style={cellStyles}>{user.surname}</Table.Cell>
              <Table.Cell style={cellStyles}>{user.email}</Table.Cell>
              <Table.Cell style={cellStyles}>{user.role}</Table.Cell>
              <Table.Cell style={cellStyles}>{user.location}</Table.Cell>
              { adminLevel === "Admin" && (
                <Table.Cell style={cellStyles}>
                  <Button 
                    buttonColour='#357ebd'
                    buttonHoverColour='#78aace'
                    onClick={(e)=>deleteHandler(e, user.userId)}
                    style={{ marginBottom: '0px' }}
                  >Delete</Button>
                </Table.Cell>
              )}
          </Table.Row>))}
        </Table>
    );
};

export default EmployeeTable;
