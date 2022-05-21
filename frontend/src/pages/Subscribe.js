import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../styles/Subscribe.css'; 

async function signUpUser(data) {
  return fetch(`${process.env.REACT_APP_URL}/auth/signup`, {
    method: 'POST',
    body: data
  })
    .then(data => data.json())
 }

 export default function Subscribe(setToken) {
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [contentUrl, setContentUrl] = useState([]);
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [confirmPasswordClass, setConfirmPasswordClass] = useState('form-control');
  const [isConfirmPasswordDirty, setIsConfirmPasswordDirty] = useState(false);
  
  
  const navigate = useNavigate();
   
  const handleSubmit = async e => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('userName', userName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);
    formData.append('contentUrl', contentUrl);
    navigate("/Connect");
    await signUpUser(formData)
  }

  useEffect(() => {
    if (isConfirmPasswordDirty) {
        if (password === confirmPassword) {
            setShowErrorMessage(false);
            setConfirmPasswordClass('form-control is-valid')
        } else {
            setShowErrorMessage(true)
            setConfirmPasswordClass('form-control is-invalid')
        }
    }
  }, [confirmPassword])

const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setIsConfirmPasswordDirty(true);
}

return(
  <div className="subscribe-wrapper">
    <h1>Inscrivez-vous!</h1>
    <form className="subscribe-form" onSubmit={handleSubmit}>
      <label>
        <p>Nom:</p>
        <input type="text" value={userName} onChange={e => setUserName(e.target.value)} />
      </label>
      <label>
        <p>E-mail:</p>
        <input type="mail" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        <p>Photo:</p>
        <input className="subscribe-img" type="file" accept="image/*" onChange={e => setContentUrl(e.target.files[0])} />
      </label>
      <label>
        <p>Mot de passe:</p>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <label>
        <p>Confirmer le mot de passe:</p>
        <input type="password" className={confirmPasswordClass} value={confirmPassword} onChange={handleConfirmPassword} />
      </label>
      {showErrorMessage && isConfirmPasswordDirty ? <div>le mot de passe ne correspond pas</div> : ''}
        <button className="subscribe-btn" type="submit" >Inscription</button> 
    </form>
  </div> 
)
}
Subscribe.propTypes = {
    setToken: PropTypes.func.isRequired
}

