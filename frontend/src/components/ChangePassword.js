import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from "react-router-dom";
import '../styles/ChangePassword.css';

function ChangePassword () {
  let {id} = useParams();
  console.log(id);
  const [oldPassword, setOldPassword] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  
  useEffect (() => {
    
    getUser();
  },[])

  function getUser() {
    
    fetch(`${process.env.REACT_APP_URL}/auth/user/${id}}`,{
      method: 'GET',
      headers: {
        'Content-type':'Application/json',
        'Authorization':`Bearer ${localStorage.getItem('token')}`
      },
      })
      .then((result) => {
        result.json()
        .then((resp) => {
          setOldPassword(resp.oldPassword)
          setPassword(resp.password)
        })
      })
  }
  function upDatePassword ()
  {
    let user = {oldPassword,password}
    
    fetch(`${process.env.REACT_APP_URL}/auth/user/${id}}`,{
      method: 'PATCH',
      headers: {
        'Content-type':'Application/json',
        'Authorization':`Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(user)
    })
    .then((result) => {result.json()
      .then((resp) => {
        console.log(resp)
        getUser()
        navigate("../Account")
      })})
  }
  return(
    <div className="change-password-wrapper">
      <h1>Changer mon mot de passe</h1>
        <label>
          <p>Ancien mot de passe:</p><input type="password" onChange={e => setOldPassword(e.target.value)} />
        </label>
        <label>
          <p>Nouveau mot de passe:</p><input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <button className="change-password-btn" onClick={upDatePassword}>Modifier</button>
        <div><Link to="/Account">Retour Compte</Link></div>
    </div>
  )
}

export default ChangePassword