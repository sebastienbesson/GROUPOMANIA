import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
//import { useParams } from "react-router-dom"; 
import '../styles/Home.css';

//let {id} = useParams(); 

async function newComment(credentials) {
  return fetch('http://localhost:3001/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

export default function CreateComment({ setToken }) {
  const [name, setName] = useState();
  const [postId, setPostId] = useState();
  const [content, setContent] = useState();
  const handleSubmit = async e => {
      e.preventDefault();
      const comment = await newComment({
        name,
        postId,
        content
      });
      setToken(comment);
    }
return(
  <div className="home-wrapper">
    <h1>Nouveau Comment</h1>
    <form className="home-form" onSubmit={handleSubmit}>
      <label>
        <p>Nom:</p>
        <input type="text" onChange={e => setName(e.target.value)} />
      </label>
      <label>
        <p>PostId:</p>
        <input type="text" onChange={e => setPostId(e.target.value)} />
      </label>
      <label>
        <p>Contenu:</p>
        <input type="text" onChange={e => setContent(e.target.value)} />
      </label>
      <div>
        <button className="subscribe-btn" type="submit" >Validez</button>
      </div>
      <div>
        <Link to="/GetPost/:id">Retour Post</Link>
      </div>
    </form>
  </div> 
)
}
CreateComment.propTypes = {
    setToken: PropTypes.func.isRequired
}