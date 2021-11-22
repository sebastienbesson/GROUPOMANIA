import React, { useState } from 'react';
import PropTypes from 'prop-types';

import '../styles/Subscribe.css';

async function signUpUser(credentials) {
  return fetch('http://localhost:3001/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

export default function Subscribe({ setToken }) {
  console.log(setToken);
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const handleSubmit = async e => {
      e.preventDefault();
      const token = await signUpUser({
        userName,
        email,
        password
      });
      setToken(token);
    }
return(
  <div className="subscribe-wrapper">
    <h1>Inscrivez-vous!</h1>
    <form className="subscribe-form" onSubmit={handleSubmit}>
      <label>
        <p>Nom:</p>
        <input type="text" onChange={e => setUserName(e.target.value)} />
      </label>
      <label>
        <p>E-mail:</p>
        <input type="text" onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        <p>Mot de passe:</p>
        <input type="password" onChange={e => setPassword(e.target.value)} />
      </label>
      <div>
        <button className="subscribe-btn" type="submit" >Inscription</button>
      </div>
    </form>
  </div> 
)
}
Subscribe.propTypes = {
    setToken: PropTypes.func.isRequired
}