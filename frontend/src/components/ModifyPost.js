import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function ModifyPost () {
  const [ title, setTitle] = useState([]);
  const [ content, setContent] = useState([]);
  const [ contentUrl, setContentUrl] = useState([]);
  let {id} = useParams();
  console.log(id);

  useEffect (() => {
    getOnePost();
  },[])

  function getOnePost() {
    fetch(`http://localhost:3001/api/posts/${id}}`,{
      method: 'GET',
      headers: {
        'Content-type':'Application/json',
        'Authorization':`Bearer ${localStorage.getItem('token')}`
      },
      })
      .then((result) => {
        result.json()
        .then((resp) => {
          setTitle(resp.title)
          setContent(resp.content)
          setContentUrl(resp.contentUrl)
        })
      })
  }
  function upDatePost ()
  {
    let post = {title,content,contentUrl}
    console.log("post", post)
    fetch(`http://localhost:3001/api/posts/${id}}`,{
      method: 'PUT',
      headers: {
        'Content-type':'Application/json',
        'Authorization':`Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(post)
    })
    .then((result) => {result.json()
      .then((resp) => {
        console.log(resp)
        getOnePost()
      })})
  }
  return(
    <div className="modifypost-wrapper">
       <label>
          <p>Titre:</p><input type="text" onChange={e => setTitle(e.target.value)} />
        </label>
        <label>
          <p>contenu:</p><input type="text" onChange={e => setContent(e.target.value)} />
        </label>
        <label>
          <p>contenu url:</p><input type="file" onChange={e => setContentUrl(e.target.files)} />
        </label>
      <input type="text" value={title} onChange={(e) => {setTitle(e.target.value)}}/>
      <input type="text" value={content} onChange={(e) => {setContent(e.target.value)}}/>
      <input type="file" value={contentUrl} onChange={(e) => {setContentUrl(e.target.files)}}/>
      <button className="modifypost-btn" onClick={upDatePost}>Modifier</button>
      <div className="modifypost-footer"><Link to="/Home">Retour</Link></div>
    </div>
  )
}

export default ModifyPost







