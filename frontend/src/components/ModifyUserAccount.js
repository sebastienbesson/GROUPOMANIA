import React, { useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import '../styles/ModifyUserAccount.css';

const ModifyUserAccount = () => {
    const [ userName, setUserName] = useState();
    const [ contentUrl, setContentUrl ] = useState();
    const navigate = useNavigate();
    let {id} = useParams();
    console.log(id);

    useEffect (() => {
      getOneUser();
    },[])

    function getOneUser() {
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
            setUserName (resp.userName)
            setContentUrl(resp.contentUrl)
          })
        })
      }

    const handleSubmit = (e) => {
      e.preventDefault();
      const data = new FormData();
      data.append('userName', userName);
      data.append('contentUrl', contentUrl);
      fetch(`${process.env.REACT_APP_URL}/auth/user/${id}}`, {
        method: 'PUT',
        headers: {
          'Authorization':`Bearer ${localStorage.getItem('token')}`
        },
        body: data,
      }).then((res) => {
        console.log(res)
        navigate("../Account")
      });
    };
  
  return(
    <div className="modifyuseraccount-wrapper">
        <label>
          <p>Changer le nom:</p><input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Changer l'image:</p><input className="modifyuseraccount-img" type="file" onChange={e => setContentUrl(e.target.files[0])} />
        </label>
        <button className="modifyuseraccount-btn" onClick={handleSubmit}>Modifier</button>
        <div><Link to="/Account">Retour Compte</Link></div>
    </div>
  )
}

export default ModifyUserAccount

