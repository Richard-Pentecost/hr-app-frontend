import React, { useState, useEffect } from 'react'
import { users } from '../data.json';
import "../style/Home.scss";

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
        <div className='userInfo__header'>
            <h1 className='userInfo__headerText'>Welcome {firstName}!</h1>
            <h2 className='userInfo__text'>{role}</h2>
            <h2 className='userInfo__text'>{email}</h2>
            <h2 className='userInfo__text'>{telephone}</h2>
        </div>
      );
    }

    return (
      <div className='userInfo'>
        {userInfo}
      </div>
    )
}

export default Home