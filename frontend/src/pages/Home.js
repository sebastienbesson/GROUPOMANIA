import React, { useState } from 'react';
import PropTypes from 'prop-types';

//import axios from 'axios';
import '../styles/Home.css'; 



async function getAllPosts() {
  return fetch('http://localhost:3001/api/posts', {
    method: 'GET',
    headers: {
      'Content-type':'Application/json',
      'Authorization':`Bearer ${localStorage.getItem('token')}`
      },
  })
  .then(response => {return response.json()})
  .then(data => {
    console.log(data)
   })
}


export default function Home({ setToken }) {

  const [name, setName] = useState();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const handleSubmit = async e => {
      e.preventDefault();
      const token = await getAllPosts({
        name,
        title,
        content
      });
      setToken(token);
    }
return(
  <div className="home-wrapper">
    <h1>Liste des Posts</h1>
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
        <input type="password" onChange={e => setContent(e.target.value)} />
      </label>
      <div>
        <button className="home-btn" type="submit" >Afficher</button>
      </div>
    </form>
  </div> 
)
}
Home.propTypes = {
    setToken: PropTypes.func.isRequired
}

