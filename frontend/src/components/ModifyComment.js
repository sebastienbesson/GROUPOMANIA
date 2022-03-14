import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import '../styles/ModifyPost.css';

/*async function upDateComment(credentials) {
  
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
}*/

function ModifyComment () {
  const [ content, setContent] = useState([]);
  const [ contentURL, setContentURL] = useState([]);
  let {id} = useParams();
  console.log(id);

  useEffect (() => {
    getOneComment();
  },[])

  function getOneComment() {
    fetch(`http://localhost:3001/api/comments?postId=${id}`,{
      method: 'GET',
      headers: {
        'Content-type':'Application/json',
        'Authorization':`Bearer ${localStorage.getItem('token')}`
      },
      })
      .then((result) => {
        result.json()
        .then((resp) => {
          setContent(resp.content)
          setContentURL(resp.contentURL)
        })
      })
  }
  function upDateComment ()
  {
    let comment = {content,contentURL}
    console.log("comment", comment)
    fetch(`http://localhost:3001/api/comments/${id}}`,{
      method: 'PUT',
      headers: {
        'Content-type':'Application/json',
        'Authorization':`Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(comment)
    })
    .then((result) => {result.json()
      .then((resp) => {
        console.log(resp)
        getOneComment()
      })})
  }
  return(
    <div className="modifycomment-wrapper">
        <label>
          <p>contenu:</p><input type="text" onChange={e => setContent(e.target.value)} />
        </label>
        <label>
          <p>contenu url:</p><input type="file" onChange={e => setContentURL(e.target.files)} />
        </label>
      <input type="text" value={content} onChange={(e) => {setContent(e.target.value)}}/>
      <input type="file" value={contentURL} onChange={(e) => {setContentURL(e.target.files)}}/>
      <button className="modifycomment-btn" onClick={upDateComment}>Modifier</button>
      <div className="modifycomment-footer"><Link to="/Home">Retour</Link></div>
    </div>
  )
}

export default ModifyComment