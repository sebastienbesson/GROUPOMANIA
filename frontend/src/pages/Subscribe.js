import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../styles/Subscribe.css';

async function signUpUser(data) {
  return fetch(`${process.env.REACT_APP_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      //'Content-Type': 'application/json'
    },
    body: data
  })
    .then(data => data.json())
    
 }

 export default function Subscribe(setToken) {
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [contentUrl, setContentUrl] = useState([]);
  
  const navigate = useNavigate();
  
  const handleSubmit = async e => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('userName', userName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('contentUrl', contentUrl);
    navigate("../Home");
    await signUpUser(formData)
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
      <label>
        <p>Photo:</p>
        <input type="file" accept="image/*" onChange={e => setContentUrl(e.target.files[0])} />
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