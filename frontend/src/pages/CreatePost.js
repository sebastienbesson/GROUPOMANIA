import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../styles/CreatePost.css';
 
async function newPost(data) {
  return fetch(`${process.env.REACT_APP_URL}/posts`, {
    method: 'POST',
    headers: {
      'Authorization':`Bearer ${localStorage.getItem('token')}`
    },
    body: data
  })
    .then(data => data.json());
   
}

export default function CreatePost() {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [contentUrl, setContentUrl] = useState([]);
  
  const navigate = useNavigate();
  
  const handleSubmit = async e => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('contentUrl', contentUrl);
    navigate("../Home");
    await newPost(formData)
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
          <p>Contenu URL:</p><input type="file" accept="image/*" onChange={e => setContentUrl(e.target.files[0])} />
        </label>
        <div>
          <button className="create-post-btn" type="submit" >Valider</button>
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

