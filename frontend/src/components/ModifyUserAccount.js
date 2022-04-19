import React, { useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

  const ModifyUserAccount = () => {
    const [ username, setUsername] = useState();
    const [ contentUrl, setContentUrl ] = useState();
    const navigate = useNavigate();
    let {id} = useParams();

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
            setUsername (resp.username)
            setContentUrl(resp.contentUrl)
          })
        })
      }

    const handleSubmit = (e) => {
      e.preventDefault();
  
      const data = new FormData();
      data.append('username', username);
      data.append('contentUrl', contentUrl);
      fetch(`${process.env.REACT_APP_URL}/auth/user/${id}}`, {
        method: 'PUT',
        headers: {
          //'Content-type':'Application/json',
          'Authorization':`Bearer ${localStorage.getItem('token')}`
        },
        body: data,
      }).then((res) => console.log(res));
        //navigate(`./GetPost/${id}`);
      
    };
  
  return(
    <div className="modifypost-wrapper">
       <label>
          <p>Changer le nom:</p><input type="text" onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          <p>Changer l'image:</p><input type="file" onChange={e => setContentUrl(e.target.files[0])} />
        </label>
      <p>Modification en cours</p>
      <input type="text" value={username} onChange={(e) => {setUsername(e.target.value)}}/>
      <input type="file"  onChange={(e) => {setContentUrl(e.target.files[0])}}/>
      <button className="modifypost-btn" onClick={handleSubmit}>Valider</button>
      <div className="modifypost-footer"><Link to="/Account">Retour</Link></div>
    </div>
  )
  }

export default ModifyUserAccount
