import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Table from '@govuk-react/table';
import BreadcrumbBar from '../components/BreadcrumbBar';
import { URL } from '../utils/Constants';
import TokenManager from '../utils/token-manager';
import '../style/EmployeesList.scss';
import Heading from '../components/Heading';
import LoadingBox from '@govuk-react/loading-box';
import GridRow from '@govuk-react/grid-row';
import GridCol from '@govuk-react/grid-col';
import SearchBox from '@govuk-react/search-box'
import Button from '@govuk-react/button';

const EmployeesList = ({history, setCurrentEmployeeId, currentEmployeeId, email, adminLevel}) => {
  const [users, setUsers] = useState([]);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleClick = (id) => {
    setCurrentEmployeeId(id);
    history.push('./view-employee');
  };

  const deleteHandler = async (e, id) => {
    e.stopPropagation();
    try {
      setLoading(true)
      const axiosHeaders = { headers: { Authorization: 'Bearer ' + TokenManager.getToken(), adminLevel }};
      const response = await axios.delete(`${URL}/user/${id}`, axiosHeaders);
      console.log(response);
      setDeleteFlag(!deleteFlag)
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const onSearchChange = (e) => {
    setSearchField(e.target.value); 
  };

  useEffect(() => {
		const fetchAllUsers = async () => {
			try { 
        setLoading(true);
        const axiosHeaders = { 
          headers: { 
            Authorization: 'Bearer ' + TokenManager.getToken(),
            adminLevel,
            email,
          },
        };
        const response = await axios.get(`${URL}/user`, axiosHeaders);
        setUsers(response.data.users);
        setLoading(false);
			} catch (error) {
        setLoading(false);
				console.log(error);
			}
		};
		fetchAllUsers();
    }, [deleteFlag, adminLevel, email]);

    useEffect(() => {
      const filtered = users.filter(user => {
        const name = `${user.firstName.toLowerCase()} ${user.surname.toLowerCase()}`;
        return name.includes(searchField.toLowerCase());
      });
      setFilteredUsers(filtered);
    }, [searchField, users]);

  return (
    <>
      <BreadcrumbBar page='View Employees'/>
      <div className='headingContainer'>
        <Heading style={{flexDirection:'row'}}>
            <GridRow>
                <GridCol>
                    View Employees
                </GridCol>
                <GridCol>
                    <SearchBox
                        style={{width:'100%'}} 
                        type='search'
                        placeholder='Search Employees'
                        onChange={onSearchChange} 
                    />
                </GridCol>
              </GridRow>
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
          <Table style={{width:'85%', justifyContent: 'center', margin:'40px 50px'}}>
            <Table.Row>
              <Table.CellHeader>First Name</Table.CellHeader>
              <Table.CellHeader>Surname</Table.CellHeader>
              <Table.CellHeader>Email</Table.CellHeader>
              <Table.CellHeader>Role</Table.CellHeader>
              <Table.CellHeader>Location</Table.CellHeader>
              <Table.CellHeader></Table.CellHeader>
            </Table.Row>
              {filteredUsers.map((user, index)=>(
              <Table.Row onClick={()=>handleClick(user.userId)} className='tableRow' key={index}>
                <Table.Cell>{user.firstName}</Table.Cell>
                <Table.Cell>{user.surname}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.role}</Table.Cell>
                <Table.Cell>{user.location}</Table.Cell>
                <Table.Cell><Button buttonColour='#357ebd' buttonHoverColour='#78aace' onClick={(e)=>deleteHandler(e, user.userId)}>Delete</Button></Table.Cell>
              </Table.Row>))}
          </Table>
        </div>
      </LoadingBox>
    </>
  );
};

export default withRouter(EmployeesList);
