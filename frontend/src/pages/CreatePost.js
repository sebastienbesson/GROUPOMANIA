import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../styles/CreatePost.css';

async function newPost(credentials) {
  return fetch('http://localhost:3001/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export default function CreatePost({ setToken }) {
  //const [name, setName] = useState();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [contentUrl, setContentUrl] = useState();
  const handleSubmit = async e => {
    e.preventDefault();
    const post = await newPost({
      
      title,
      content,
      contentUrl
    });
  }
return(
  <div className="create-post-wrapper">
    <h1>Nouveau Post</h1>
      <form className="create-post-form" onSubmit={handleSubmit}>
        
        <label>
          <p>Titre:</p><input type="text" onChange={e => setTitle(e.target.value)} />
        </label>
        <label>
          <p>Contenu:</p><input type="text" onChange={e => setContent(e.target.value)} />
        </label>
        <label>
          <p>Contenu URL:</p><input type="file" onChange={e => setContentUrl(e.target.files)} />
        </label>
        <div>
          <button className="create-post-btn" type="submit" >Validez</button>
        </div>
        <div>
          <Link to="/Home">Retour à la liste</Link>
        </div>
      </form>
  </div> 
)
}
CreatePost.propTypes = {
    setToken: PropTypes.func.isRequired
}