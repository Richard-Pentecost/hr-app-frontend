import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { URL } from '../utils/Constants';
import TokenManager from '../utils/token-manager';
import Table from '@govuk-react/table';
import BreadcrumbBar from '../components/BreadcrumbBar';
import Heading from '../components/Heading';

const VisitsList = ({history, adminLevel, email, setCurrentVisitId}) => {
    const [visitors, setVisitors] = useState([{visitorId:1, firstName:"Azlina", surname:"Yeo",company:"Disneyland",appointment:"Monday 15:30"},{visitorId:2, firstName:"Joanna", surname:"Fawl", company: "Abc", appointment: "Monday 15:30"}]);
    const [filteredVisitors, setFilteredVisitors] = useState([]);
    const [searchField, setSearchField] = useState('');
    const [deleteFlag, setDeleteFlag] = useState(false);
    
    const handleClick = (id) => {
        setCurrentVisitId(id);
        history.push('./view-visit');
    };
    
    const onSearchChange = (e) => {
        setSearchField(e.target.value); 
    };

    const deleteHandler = async (e, id) => {
        e.stopPropagation();
        try {
          
            const response = await axios.delete(`${URL}/visitor/${id}`);
            console.log(response);
            setDeleteFlag(!deleteFlag)
          
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchVisitsList = async () => {
            try {
                const axiosHeaders = {
                    headers: {
                        Authorization: 'Bearer ' + TokenManager.getToken(),
                        adminLevel,
                        email,
                    },
                };
                /* Uncomment below when api is up */
                /* const response = await axios.get(`${URL}/visitor`, axiosHeaders);
                console.log(response);
                setVisitors(response.data.visitors);
                */
            } catch (error) {
                console.log(error);
            }

        }
        fetchVisitsList();

    },[deleteFlag])

    useEffect(() => {
        console.log(visitors);
        const filtered = visitors.filter(visitor => {
            const name = `${visitor.firstName.toLowerCase()} ${visitor.surname.toLowerCase()}`;
            return name.includes(searchField.toLowerCase());
        });
        setFilteredVisitors(filtered);
    }, [searchField, visitors]);

    return(
        <>
            <BreadcrumbBar page='View Visits'/>
            <div className='headingContainer'>
                <Heading>View Visits</Heading>
            </div>
            <input
                    type='search'
                    placeholder='Search Employees'
                    onChange={onSearchChange} 
            />
            <div className='visitsTable'>
                <Table>
                <Table.Row>
                    <Table.CellHeader>First Name</Table.CellHeader>
                    <Table.CellHeader>Surname</Table.CellHeader>
                    <Table.CellHeader>Company</Table.CellHeader>
                    <Table.CellHeader>Appointment Time</Table.CellHeader>
                    <Table.CellHeader></Table.CellHeader>
                </Table.Row>
                    {filteredVisitors.map((visitor, index)=>(
                    <Table.Row onClick={()=>handleClick(visitor.visitorId)} className='tableRow' key={index}>
                    <Table.Cell>{visitor.firstName}</Table.Cell>
                    <Table.Cell>{visitor.surname}</Table.Cell>
                    <Table.Cell>{visitor.company}</Table.Cell>
                    <Table.Cell>{visitor.appointment}</Table.Cell>
                    <Table.Cell><button onClick={(e)=>deleteHandler(e, visitor.visitorId)}>Delete</button></Table.Cell>
                    </Table.Row>))}
                </Table>
            </div>
        </>
    )
}

export default VisitsList;
