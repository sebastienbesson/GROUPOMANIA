import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../styles/ChangePassword.css';

async function upDatePassword(credentials) {
  return fetch(`http://localhost:3001/api/auth/user/${localStorage.getItem('userId')}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
    
}

export default function ChangePassword({ setToken }) {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [oldPassword, setOldPassword] = useState();
  const [password, setPassword] = useState();
  
  const handleSubmit = async e => {
      e.preventDefault();
      const userUpDate = await upDatePassword({
        username,
        email,
        oldPassword,
        password,
      });
      console.log(password);
      setToken(userUpDate);
      console.log(userUpDate); 
  }

return(
  <div className="change-password-wrapper">
    <h1>Changer le mot de passe</h1>
      <form className="change-password-form" onSubmit={handleSubmit}>
        <label>
          <p>Nom:</p><input type="text" onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          <p>Email:</p><input type="text" onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          <p>Ancien mot de passe:</p><input type="text" onChange={e => setOldPassword(e.target.value)} />
        </label>
        <label>
          <p>Nouveau mot de passe:</p><input type="text" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button className="change-password-btn" type="submit">Validez</button>
        </div>
        <div>
          <Link to="/Connect">Retour Connect</Link>
        </div>
      </form>
  </div> 
)
}
ChangePassword.propTypes = {
    setToken: PropTypes.func.isRequired
}