import React from 'react';
import Table from '@govuk-react/table';
import Button from '@govuk-react/button';
import moment from 'moment';

const VisitTable = ({ visitors, handleClick, deleteHandler, adminLevel }) => {
    const cellStyles = {padding: '10px'};
    return (
        <Table style={{width:'85%', justifyContent: 'center', margin:'40px 50px'}} >
            <Table.Row>
                <Table.CellHeader  style={cellStyles}>First Name</Table.CellHeader>
                <Table.CellHeader style={cellStyles}>Surname</Table.CellHeader>
                <Table.CellHeader style={cellStyles}>Company</Table.CellHeader>
                {adminLevel==='Admin' && <Table.CellHeader style={cellStyles}>Employee Email</Table.CellHeader>}
                <Table.CellHeader style={cellStyles}>Appointment Time</Table.CellHeader>
                <Table.CellHeader style={cellStyles}></Table.CellHeader>
            </Table.Row>
            {visitors.map((visitor, index)=>(
                <Table.Row onClick={()=>handleClick(visitor.visitorId)} className='tableRow' key={index}>
                    <Table.Cell style={cellStyles}>{visitor.firstName}</Table.Cell>
                    <Table.Cell style={cellStyles}>{visitor.surname}</Table.Cell>
                    <Table.Cell style={cellStyles}>{visitor.company}</Table.Cell>
                    {adminLevel==='Admin' && <Table.Cell style={cellStyles}>{visitor.employeeEmail}</Table.Cell>}
                    <Table.Cell style={cellStyles}>{moment(visitor.appointment).format('llll')}</Table.Cell>
                    <Table.Cell style={cellStyles}>
                        <Button
                            buttonColour='#357ebd'
                            buttonHoverColour='#78aace'
                            onClick={(e)=>deleteHandler(e, visitor.visitorId)}
                            style={{ marginBottom: '0px' }}
                        >Delete</Button>
                    </Table.Cell>
                </Table.Row>
            ))}
        </Table>
    );  
};

export default VisitTable