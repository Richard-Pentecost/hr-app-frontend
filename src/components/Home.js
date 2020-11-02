import React, { useState, useEffect } from 'react'
import { users } from '../data.json';

const Home = props => {
    const [firstName, setFirstName] = useState('');

    useEffect(() => {
      const user = users.find(item => item.id === props.id);
      if (user) {
        setFirstName(user.firstName);
      }
    }, [props.id]);

    return (
      <div>
        <h1>Homepage</h1>
        { firstName ? <h1>Hello {firstName}</h1> : null}
      </div>
    )
}

export default Home