import React, { useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; 

const ModifyPost = () => {
    const [title, setTitle] = useState();
    const [ content, setContent ] = useState();
    const [ contentUrl, setContentUrl ] = useState();
    const navigate = useNavigate();
    let {id} = useParams();

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

      const handleSubmit = (e) => {
        e.preventDefault();
    
        const data = new FormData();
        data.append('title', title);
        data.append('content', content);
        data.append('contentUrl', contentUrl);
        navigate(`../GetPost/${id}`); 
        fetch(`${process.env.REACT_APP_URL}/posts/${id}}`, {
          method: 'PUT',
          headers: {
            'Authorization':`Bearer ${localStorage.getItem('token')}`
          },
          body: data,
        }).then((res) => console.log(res));
      };

  return(
    <div className="modifypost-wrapper">
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
      <input type="file"  onChange={(e) => {setContentUrl(e.target.files[0])}}/>
      <button className="modifypost-btn" onClick={handleSubmit}>Valider</button>
      <div className="modifypost-footer"><Link to="/Home">Retour</Link></div>
    </div>
  )
  }
  

export default ModifyPost

