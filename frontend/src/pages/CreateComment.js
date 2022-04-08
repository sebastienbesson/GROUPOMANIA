import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams, useNavigate } from 'react-router-dom';

import '../styles/CreateComment.css';

async function newComment(credentials) {
  
  return fetch(`${process.env.REACT_APP_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(credentials),
  })
    .then(data => data.json())
}

export default function CreateComment() {
  let { postId } = useParams();
  const [content, setContent] = useState();
  const navigate = useNavigate();
  const handleSubmit = async e => {
      e.preventDefault();
      const comment = await newComment({
        postId: postId,
        content
      });
      navigate(`../GetPost/${postId}`)
  }
return(
  <div className="create-comment-wrapper">
    <h1>Nouveau Commentaire</h1>
      <form className="create-comment-form" onSubmit={handleSubmit}>
        <label>
          <p>Contenu:</p><input type="text" onChange={e => setContent(e.target.value)} />
        </label>
        <div>
          <button className="create-comment-btn" type="submit">Validez</button>
        </div>
        <div>
          <Link to="/Home">Retour Post</Link>
        </div>
      </form>    
  </div> 
)
}
CreateComment.propTypes = {
    setToken: PropTypes.func.isRequired
}