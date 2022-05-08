import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../styles/Connect.css';

async function loginUser(credentials) {
  
  return fetch(`${process.env.REACT_APP_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  .then(response => {return response.json()})
  .then(data => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', data.userId);
    localStorage.setItem('isAdmin', data.isAdmin);
  })
}

let id = localStorage.getItem('userId');
let isAdmin = localStorage.getItem('isAdmin');
console.log(isAdmin);

export default function Connect({ setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = async e => {
      e.preventDefault();
      const token = await loginUser({
        email,
        password,
        id, 
        isAdmin
      })
      navigate("/Home");
    }
return(
  <div className="connect-wrapper">
    <h1>Connectez-vous!</h1>
    <form className="connect-form" onSubmit={handleSubmit}>
      
      <label>
        <p>E-mail:</p>
        <input type="text" onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        <p>Mot de passe:</p>
        <input type="password" onChange={e => setPassword(e.target.value)} />
      </label> 
      <div>
        <button className="connect-btn" type="submit">Connexion</button>
        <p className='errorMsg'></p>
      </div>
      
      
    </form>
  </div> 
)
}
Connect.propTypes = {
    setToken: PropTypes.func.isRequired
}