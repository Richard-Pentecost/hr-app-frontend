import React, { useEffect, } from 'react';
import { Grid, Box, FormGroup, TextField, Button } from '@material-ui/core'
import { URL } from '../utils/Constants';
import axios from 'axios';
import moment from  'moment';
import '../style/EditInformation.scss';

const EditInformation = ({history, isLoggedIn, id, user, setUser}) => {
    const clickHandler = () => {
        history.goBack();
    }
	useEffect(() => {
		const fetchUser = async () => {
			console.log(id);
			try {
                const response = await axios.get(`${URL}/user/${id}`);
				const { firstName, surname, role, email, telephone, doB, permissionLevel, address, nextOfKin, salary, location } = response.data;
				// console.log(response.data)
				setUser({
					firstName,
					surname,
					role,
					email,
					telephone,
					doB,
					permissionLevel,
					nextOfKin,
					salary,
					location,
					address,
				})
			} catch (error) {
				console.log(error);
			}
		};
		fetchUser();
    }, [setUser, id]);
    

    const handleInputChange = event => {
        setUser({
            ...user,
            [event.target.name]: event.target.value}
        );
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`${URL}/user/${id}`, user );
            console.log(response.data);
            const { firstName, surname, role, email, telephone, doB, permissionLevel, address, nextOfKin, salary, location } = response.data;

            setUser({
                firstName,
                surname,
                role,
                email,
                telephone,
                doB,
                permissionLevel,
                nextOfKin,
                salary,
                location,
                address,
            })
            
        } catch (error) {
            console.log(error.response);
        }
    }
    
    // const formElementsArray = [];

    // for (let key in user) {
    //     if (key.match(/[A-Z]/)) {
    //         console.log(key)
    //     }
    //     const label = key[0].toUpperCase() + key.substring(1);

    //     formElementsArray.push({
    //         name: key,
    //         label: label,
    //         value: user[key],
    //     });
    // };

    return (
        <Grid 
            container
            direction="row"
            justify="center"
            alignItems="center"
            border={1}
        >
            <Box border={1} width='90%' textAlign='center'>
                <h1>Edit Information Page</h1>
                <button onClick={clickHandler}>Go back</button>
            </Box>
            <Box border={1} width="50%">
                <FormGroup>
                    <TextField 
                        error={false}
                        value={user.firstName}
                        name={'firstName'}
                        type='text'
                        label={'First Name'}
                        placeholder={'First Name'}
                        onChange={handleInputChange}
                    />
                    <TextField 
                        error={false}
                        value={user.surname}
                        name={'surname'}
                        type='text'
                        label={'Surname'}
                        placeholder={'Surname'}
                        onChange={handleInputChange}
                    />
                    <TextField 
                        error={false}
                        value={user.role}
                        name={'role'}
                        type='text'
                        label={'Role'}
                        placeholder={'Role'}
                        onChange={handleInputChange}
                    />
                    <TextField 
                        error={false}
                        value={user.email}
                        name={'email'}
                        type='text'
                        label={'Email'}
                        placeholder={'Email'}
                        onChange={handleInputChange}
                    />
                    <TextField 
                        error={false}
                        value={user.telephone}
                        name={'telephone'}
                        type='text'
                        label={'Telephone'}
                        placeholder={'Telephone'}
                        onChange={handleInputChange}
                    />
                    <TextField 
                        error={false}
                        value={moment(user.doB).format('d/MM/YYYY')}
                        name={'doB'}
                        type='text'
                        label={'Date of Birth'}
                        placeholder={'Date of Birth'}
                        onChange={handleInputChange}
                    />
                    <TextField 
                        error={false}
                        value={user.permissionLevel}
                        name={'permissionLevel'}
                        type='text'
                        label={'Permission Level'}
                        placeholder={'Permission Level'}
                        onChange={handleInputChange}
                    />
                    <TextField 
                        error={false}
                        value={user.nextOfKin}
                        name='nextOfKin'
                        type='text'
                        label='Next of Kin'
                        placeholder='Next of Kin'
                        onChange={handleInputChange}
                    />
                    <TextField 
                        error={false}
                        value={user.salary}
                        name='salary'
                        type='text'
                        label='Salary'
                        placeholder='Salary'
                        onChange={handleInputChange}
                    />
                    <TextField 
                        error={false}
                        value={user.location}
                        name='location'
                        type='text'
                        label='Location'
                        placeholder='Location'
                        onChange={handleInputChange}
                    />
                    <TextField 
                        error={false}
                        value={user.address}
                        name='address'
                        type='text'
                        label='Address'
                        placeholder='Address'
                        onChange={handleInputChange}
                    />

                
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={handleSubmit}
                        margin="normal"
                    >Save</Button>
                </FormGroup>
            </Box>
        </Grid>
        
    );
}

export default EditInformation