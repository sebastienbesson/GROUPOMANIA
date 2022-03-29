import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import '../styles/ModifyPost.css';

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