import React, { useState } from 'react';
import PropTypes from 'prop-types';

import '../styles/Home.css';

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
  const [name, setName] = useState();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const handleSubmit = async e => {
      e.preventDefault();
      const post = await newPost({
        name,
        title,
        content
      });
      setToken(post);
    }
return(
  <div className="home-wrapper">
    <h1>Nouveau Post</h1>
    <form className="home-form" onSubmit={handleSubmit}>
      <label>
        <p>Nom:</p>
        <input type="text" onChange={e => setName(e.target.value)} />
      </label>
      <label>
        <p>Titre:</p>
        <input type="text" onChange={e => setTitle(e.target.value)} />
      </label>
      <label>
        <p>Contenu:</p>
        <input type="text" onChange={e => setContent(e.target.value)} />
      </label>
      <div>
        <button className="subscribe-btn" type="submit" >Validez</button>
      </div>
    </form>
  </div> 
)
}
CreatePost.propTypes = {
    setToken: PropTypes.func.isRequired
}