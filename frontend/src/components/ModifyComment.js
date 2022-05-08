import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import '../styles/ModifyComment.css';

function ModifyComment () {
  const [ content, setContent] = useState([]);
  let {id} = useParams();
  console.log(id);

  useEffect (() => {
    getOneComment();
  },[])

  function getOneComment() {
    fetch(`${process.env.REACT_APP_URL}/comments?postId=${id}`,{
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
        })
      })
  }
  function upDateComment ()
  {
    let comment = {content}
    console.log("comment", comment)
    fetch(`${process.env.REACT_APP_URL}/comments/${id}}`,{
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
      })
    })
  }
  return(
    <div className="modifycomment-wrapper">
      <label>
          <p>Nouveau commentaire:</p>
          <input type="text" className="modifycomment-text" onChange={e => setContent(e.target.value)} />
      </label>
      <div className="modifycomment-btn"><button onClick={upDateComment}>Modifier</button></div>
      <div className="modifycomment-footer"><Link to="/Home">Retour</Link></div>
    </div>
  )
}

export default ModifyComment