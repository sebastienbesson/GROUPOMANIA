import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


import '../styles/CreateComment.css';

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
  //const [name, setName] = useState();
  //const [postId, setPostId] = useState();
  const [content, setContent] = useState();
  
  const handleSubmit = async e => {
      e.preventDefault();
      const comment = await newComment({
        name: localStorage.getItem('userName'),
        postId: localStorage.getItem('id'),
        content
      });
      setToken(comment);
    }
return(
  <div className="create-comment-wrapper">
      <h1>Nouveau Commentaire</h1>
          <form className="create-comment-form" onSubmit={handleSubmit}>
              <label>
                  <p>Contenu:</p>
                      <input type="text" onChange={e => setContent(e.target.value)} />
              </label>
              <div>
                  <button className="create-comment-btn" type="submit">Validez</button>
              </div>
              <div>
                  <Link to="/home">Retour Post</Link>
              </div>
          </form>
        
  </div> 
)
}
CreateComment.propTypes = {
    setToken: PropTypes.func.isRequired
}