import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import '../styles/ChangePassword.css';

function ChangePassword () {
  let {id} = useParams();
  console.log(id);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [oldPassword, setOldPassword] = useState();
  const [password, setPassword] = useState();
  
  useEffect (() => {
    
    getUser();
  },[])

  function getUser() {
    
    fetch(`http://localhost:3001/api/auth/user/${id}}`,{
      method: 'GET',
      headers: {
        'Content-type':'Application/json',
        'Authorization':`Bearer ${localStorage.getItem('token')}`
      },
      })
      .then((result) => {
        result.json()
        .then((resp) => {
          setUsername(resp.username)
          setEmail(resp.email)
          setOldPassword(resp.oldPassword)
          setPassword(resp.password)
        })
      })
  }
  function upDatePassword ()
  
  {
    let user = {username,email,oldPassword,password}
    console.log("user", user)
    fetch(`http://localhost:3001/api/auth/user/${id}}`,{
      method: 'PUT',
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
      })})
  }
  return(
    <div className="change-password-wrapper">
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
        <button className="change-password-btn" onClick={upDatePassword}>Modifier</button>
        <div><Link to="/connect">Retour Connect</Link></div>
    </div>
  )
}

export default ChangePassword

