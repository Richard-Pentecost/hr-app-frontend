import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { URL } from '../utils/Constants';
import TokenManager from '../utils/token-manager';
import Table from '@govuk-react/table';
import BreadcrumbBar from '../components/BreadcrumbBar';
import Heading from '../components/Heading';
import Button from '@govuk-react/button';
import moment from 'moment';
import '../style/CreateEmployee.scss';
import LoadingBox from '@govuk-react/loading-box';
import SearchBar from '../components/SearchBar';

const VisitsList = ({history, adminLevel, email, setCurrentVisitId}) => {
    const [visitors, setVisitors] = useState([]);
    const [filteredVisitors, setFilteredVisitors] = useState([]);
    const [searchField, setSearchField] = useState('');
    const [deleteFlag, setDeleteFlag] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const handleClick = (id) => {
        setCurrentVisitId(id);
        history.push('./view-visit');
    };
    
    // const onSearchChange = (e) => {
    //     setSearchField(e.target.value); 
    // };

    const deleteHandler = async (e, id) => {
        e.stopPropagation();
        try {
            const response = await axios.delete(`${URL}/visitor/${id}`);
            console.log(response);
            setDeleteFlag(!deleteFlag)
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchVisitsList = async () => {
            try {
                setLoading(true);
                const axiosHeaders = {
                    headers: {
                        Authorization: 'Bearer ' + TokenManager.getToken(),
                        adminLevel,
                        email,
                    },
                };
                const response = await axios.get(`${URL}/visitor`, axiosHeaders);
                console.log(response);
                setVisitors(response.data.visitors);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }

        }
        fetchVisitsList();

    },[deleteFlag, adminLevel, email])

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
                <Heading style={{flexDirection:'row'}}>
                <SearchBar setSearchField={setSearchField} placeholder="Search Visits" heading='View Visits' />
                    {/* <GridRow>
                        <GridCol>
                            View Visits
                        </GridCol>
                        <GridCol>
                            <SearchBox
                                style={{width:'100%'}} 
                                type='search'
                                placeholder='Search Visits'
                                onChange={onSearchChange} 
                            />
                        </GridCol>
                    </GridRow> */}
                </Heading>
            </div>
            <LoadingBox
                loading={loading}
                backgroundColor={'#fff'}
                timeIn={800}
                timeOut={200}
                backgroundColorOpacity={0.85}
                spinnerColor={'#000'}
            >
                <div align='center'>
                <Table style={{width:'85%', justifyContent: 'center', margin:'40px 50px'}} >
                <Table.Row>
                    <Table.CellHeader>First Name</Table.CellHeader>
                    <Table.CellHeader>Surname</Table.CellHeader>
                    <Table.CellHeader>Company</Table.CellHeader>
                    {adminLevel==='Admin' && <Table.CellHeader>Employee Email</Table.CellHeader>}
                    <Table.CellHeader>Appointment Time</Table.CellHeader>
                    <Table.CellHeader></Table.CellHeader>
                </Table.Row>
                    {filteredVisitors.map((visitor, index)=>(
                    <Table.Row onClick={()=>handleClick(visitor.visitorId)} className='tableRow' key={index}>
                    <Table.Cell>{visitor.firstName}</Table.Cell>
                    <Table.Cell>{visitor.surname}</Table.Cell>
                    <Table.Cell>{visitor.company}</Table.Cell>
                    {adminLevel==='Admin' && <Table.Cell>{visitor.employeeEmail}</Table.Cell>}
                    <Table.Cell>{moment(visitor.appointment).format('llll')}</Table.Cell>
                    <Table.Cell><Button buttonColour='#357ebd' buttonHoverColour='#78aace' onClick={(e)=>deleteHandler(e, visitor.visitorId)}>Delete</Button></Table.Cell>
                    </Table.Row>))}
                </Table>
                </div>
            </LoadingBox>
        </>
    )
}

export default VisitsList;
