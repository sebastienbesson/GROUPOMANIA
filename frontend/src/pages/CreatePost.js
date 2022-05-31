import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    navigate("../CreatePost");
    await newPost(formData)
  }

  return(
    <div >
      <h1>Nouveau Post</h1>
        <div className="createpost-wrapper" >
          <label>
            <p>Titre:</p><input className="createpost-text" type="text" onChange={e => setTitle(e.target.value)} />
          </label>
          <label>
            <p>Message:</p><input className="createpost-text" type="text" onChange={e => setContent(e.target.value)} />
          </label>
          <label>
            <p>Image:</p><input className="createpost-img" type="file" accept="image/*" onChange={e => setContentUrl(e.target.files[0])} />
          </label>
          <div>
            <button className="createpost-btn" onClick={handleSubmit} >Valider</button>
          </div>
          <div>
            <Link to="/Home">Retour à la liste</Link>
          </div>
        </div>
    </div> 
  )
}

