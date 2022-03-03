import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import '../styles/GetPost.css';

async function upDateComment(credentials) {
  
  return fetch(`http://localhost:3001/api/comments`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
    
}

export default function ModifyComment({ setToken }) {
  
  const [content, setContent] = useState();
  const [contentURL, setContentURL] = useState();
  
  const handleSubmit = async e => {
      e.preventDefault();
      const commentUpDate = await upDateComment({
        content,
        contentURL,
      });
      setToken(commentUpDate);
  }



return(
  <div className="getpost-wrapper">
    <h1>Modifier le comment</h1>
      <form className="getpost-wrapper" onSubmit={handleSubmit}>
        <label>
          <p>Content:</p><input type="text" onChange={e => setContent(e.target.value)} />
        </label>
        <label>
          <p>ContentURL:</p><input type="file" onChange={e => setContentURL(e.target.value)} />
        </label>
        <div>
          <button className="change-password-btn" type="submit">Validez</button>
        </div>
        <div>
          <Link to="/Home">Retour Post</Link>
        </div>
      </form>
  </div> 
)
}


ModifyComment.propTypes = {
    setToken: PropTypes.func.isRequired
}