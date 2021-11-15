import React, { useState } from 'react';
import PropTypes from 'prop-types';

import '../styles/Connect.css';

async function loginUser(credentials) {
    return fetch('http://localhost:8080/Connect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }

export default function Connect( { setToken }) {
    const [username, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
          username,
          email,
          password
        });
        setToken(token);
      }
  return(
    <div className="connect-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Email</p>
          <input type="text"onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password"onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}
Connect.propTypes = {
    setToken: PropTypes.func.isRequired
}