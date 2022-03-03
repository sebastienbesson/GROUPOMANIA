import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
//import { useParams } from "react-router-dom";
import '../styles/GetPost.css';

async function upDatePost(credentials) {
  //let {id} = useParams();
  return fetch(`http://localhost:3001/api/posts/${localStorage.getItem('id')}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
    
}

export default function ModifyPost({ setToken }) {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [contentURL, setContentURL] = useState();
  
  const handleSubmit = async e => {
      e.preventDefault();
      const postUpDate = await upDatePost({
        title,
        content,
        contentURL,
      });
      setToken(postUpDate);
  }

return(
  <div className="getpost-wrapper">
    <h1>Modifier le post</h1>
      <form className="getpost-wrapper" onSubmit={handleSubmit}>
        <label>
          <p>Titre:</p><input type="text" onChange={e => setTitle(e.target.value)} />
        </label>
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
          <Link to="/Connect">Retour Post</Link>
        </div>
      </form>
  </div> 
)
}
ModifyPost.propTypes = {
    setToken: PropTypes.func.isRequired
}

