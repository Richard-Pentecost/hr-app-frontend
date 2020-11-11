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
        console.log(user.doB)
        console.log(new Date(user.doB));
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
    
    const formElementsArray = [];
        for (let key in user) {
        formElementsArray.push({
            name: key,
            value: user[key],
        });
    };
 
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
                    {formElementsArray.map(formElement => (
                        <TextField 
                            error={false}
                            value={formElement.value}
                            name={formElement.name}
                            type='text'
                            label={formElement.name}
                            placeholder={formElement.name}
                            onChange={handleInputChange}
                        />
                    ))}
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