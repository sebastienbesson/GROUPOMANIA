import React, { useState } from 'react';
import PropTypes from 'prop-types';
//import axios from 'axios';

import '../styles/Home.css';

/*const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI2LCJpYXQiOjE2Mzc5MjAxMzYsImV4cCI6MTYzODAwNjUzNn0.fFM4w0gygjZj3ouOD2ZRBQuJMse0LDeSbjz0FfZq5qg';
const url = 'http://localhost:3001/api';

axios.interceptors.request.use(
  config => {
    config.headers.authorization = `Bearer ${accessToken}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
)

export default  function Home ({setPosts}) {
  const [posts, setPosts] = useState([]);
  const [requestError, setRequestError] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const result = await axios.get(`${url}/posts`);
      setPosts(result.data);
    } catch(err) {
      setRequestError(err.message);
    }
  });

  return (
    <div className="homePosts">
      <button onClick={() => fetchData()}>Afficher</button>
      {posts.map(post => {
        return <p key={post.id}>{post.name}</p>
      })}
    </div>
  )
}*/

async function getAllPosts() {
  
  return fetch('http://localhost:3001/api/posts', {
    method: 'GET',
    headers: {
      'Content-type':'Application/json'
      },
  })
    .then(data => data.json())
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

