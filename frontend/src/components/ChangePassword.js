import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import '../styles/Connect.css';

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
  const [newPassword, setNewPassword] = useState();
  
  const handleSubmit = async e => {
      e.preventDefault();
      const userUpDate = await upDatePassword({
        username,
        email,
        oldPassword,
        newPassword,
      
      });
      let password = newPassword;
      console.log(password);
      setToken(userUpDate);
      console.log(userUpDate);
      
    }


return(
  <div className="create-comment-wrapper">
    <h1>Changer le mot de passe</h1>
    <form className="create-comment-form" onSubmit={handleSubmit}>
    <label>
        <p>Nom:</p>
        <input type="text" onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        <p>Email:</p>
        <input type="text" onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        <p>Ancien mot de passe:</p>
        <input type="text" onChange={e => setOldPassword(e.target.value)} />
      </label>
      <label>
        <p>Nouveau mot de passe:</p>
        <input type="text" onChange={e => setNewPassword(e.target.value)} />
      </label>
      
      <div>
        <button className="create-comment-btn" type="submit">Validez</button>
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