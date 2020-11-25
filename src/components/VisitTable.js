import React from 'react';
import Table from '@govuk-react/table';
import Button from '@govuk-react/button';
import moment from 'moment';

const VisitTable = ({ visitors, handleClick, deleteHandler, adminLevel }) => {
    return (
        <Table style={{width:'85%', justifyContent: 'center', margin:'40px 50px'}} >
            <Table.Row>
                <Table.CellHeader>First Name</Table.CellHeader>
                <Table.CellHeader>Surname</Table.CellHeader>
                <Table.CellHeader>Company</Table.CellHeader>
                {adminLevel==='Admin' && <Table.CellHeader>Employee Email</Table.CellHeader>}
                <Table.CellHeader>Appointment Time</Table.CellHeader>
                <Table.CellHeader></Table.CellHeader>
            </Table.Row>
            {visitors.map((visitor, index)=>(
                <Table.Row onClick={()=>handleClick(visitor.visitorId)} className='tableRow' key={index}>
                    <Table.Cell>{visitor.firstName}</Table.Cell>
                    <Table.Cell>{visitor.surname}</Table.Cell>
                    <Table.Cell>{visitor.company}</Table.Cell>
                    {adminLevel==='Admin' && <Table.Cell>{visitor.employeeEmail}</Table.Cell>}
                    <Table.Cell>{moment(visitor.appointment).format('llll')}</Table.Cell>
                    <Table.Cell><Button buttonColour='#357ebd' buttonHoverColour='#78aace' onClick={(e)=>deleteHandler(e, visitor.visitorId)}>Delete</Button></Table.Cell>
                </Table.Row>
            ))}
        </Table>
    );  
};

export default VisitTable