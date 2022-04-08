import React, { useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function ModifyPost () {
  const [ title, setTitle] = useState([]);
  const [ content, setContent] = useState([]);
  const [ contentUrl, setContentUrl] = useState([]);

  let formData = new FormData();
  formData.append('title', title);
  formData.append('content', content);
  formData.append('contentUrl', contentUrl);
  const navigate = useNavigate();
  let {id} = useParams();
  console.log(id);

  useEffect (() => {
    getOnePost();
  },[])

  function getOnePost() {
    fetch(`${process.env.REACT_APP_URL}/posts/${id}}`,{
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
    
//formdata
    let post = {title,content,contentUrl}
    
    console.log("post", post)
    fetch(`${process.env.REACT_APP_URL}/posts/${id}}`,{
      method: 'PUT',
      headers: {
        //'Content-type':'Application/json',
        'Authorization':`Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(post)
    })
    .then((result) => {result.json()
      .then((resp) => {
        console.log(resp)
        getOnePost()
        navigate(`../GetPost/${id}`)
      })})
  }

   
  
  return(
    <div className="modifypost-wrapper" >
       <label>
          <p>Changer le titre:</p><input type="text" onChange={e => setTitle(e.target.value)} />
        </label>
        <label>
          <p>Changer le contenu:</p><input type="text" onChange={e => setContent(e.target.value)} />
        </label>
        <label>
          <p>Changer l'image:</p><input type="file" onChange={e => setContentUrl(e.target.files[0])} />
        </label>
      <p>Modification en cours</p>
      <input type="text" value={title} onChange={(e) => {setTitle(e.target.value)}}/>
      <input type="text" value={content} onChange={(e) => {setContent(e.target.value)}}/>
      <button className="modifypost-btn" onClick={upDatePost}>Valider</button>
      <div className="modifypost-footer"><Link to="/Home">Retour</Link></div>
    </div>
  )
  }

export default ModifyPost








