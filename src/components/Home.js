import React, { useState, useEffect } from 'react'
import { users } from '../data.json';

const Home = props => {
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');

    useEffect(() => {
      const user = users.find(item => item.id === props.id);
      if (user) {
        setFirstName(user.firstName);
        setSurname(user.surname);
        setRole(user.role);
        setEmail(user.email);
        setTelephone(user.telephone);
      }
    }, [props.id]);

    let userInfo = null;
    if (firstName && role && email && telephone) {
      userInfo = ( 
        <>
          <h1>Welcome {firstName}!</h1>
          <h1>{role}</h1>
          <h1>{email}</h1>
          <h1>{telephone}</h1>
        </>
      );
    }

    return (
      <div>
        {userInfo}
      </div>
    )
}

export default Home