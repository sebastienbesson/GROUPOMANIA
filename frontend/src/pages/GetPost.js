import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import '../styles/GetPost.css';

export default function GetPost (data) {
    const [post, setPost] = useState({});
    let {id} = useParams();
    console.log(id);
    localStorage.setItem('id', id);
    
    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_URL}/posts/${id}}`, {
          method: 'GET',
          headers: {
            'Authorization':`Bearer ${localStorage.getItem('token')}`
            },
        body: data,
        })
        .then(response => {
            console.log(response.data);
            setPost(
                response.data 
            )
        })
      },[]);
    
    const[postIds, setPostIds] = useState([]);
   
    useEffect(() => {
        axios 
        .get(`${process.env.REACT_APP_URL}/comments?postId=${id}`, {
            method: 'GET',
            headers: {
                'Content-type':'Application/json',
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            },
        })
        .then(response => {
            console.log(response.data);
            setPostIds (
                response.data
            )
        })
    },[]);
    
    const navigate = useNavigate();

    function deletePost(id)
        { fetch(`${process.env.REACT_APP_URL}/posts/${id}}`,{
            method: 'DELETE',
            headers: {
                'Content-type':'Application/json',
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((result) => {
                result.json()
            .then((resp) => {
                console.log(resp)
                navigate("../Home")
            })
            })
    }
    
    function deleteComment(id)
        { fetch(`${process.env.REACT_APP_URL}/comments/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-type':'Application/json',
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            },
        })
            .then((result) => {
                result.json()
            .then((resp) => {
                console.log(resp)
            })
            })
        }
    return(
        <div className="getpost-wrapper">
            {console.log(post)}
            {post &&(
                <div>
                    <div>id:{post.id}</div>
                    <div>name:{post.name}</div>
                    <div>title:{post.title}</div>
                    <div>contentgetpost:{post.content}</div>
                    <div>contentURL:<img src={post.contentUrl}/></div> 
                </div>
            )}
            <div className="getpost-delete-btn"><button onClick={()=>deletePost(post.id)}>Supprimer</button></div>
            
            <div className="getpost-footer"><Link to={{pathname: `/ModifyPost/${post.id}`}}>Modifier le Post</Link></div>
            <div className="getpost-footer"><Link to="/Home">Retour</Link></div>
            <div className="getpost-footer"><Link to={{pathname: `/CreateComment/${post.id}`}}>Créer un commentaire</Link></div>
            <div>
                <p>{postIds.length} commentaire(s) pour ce Post</p>
                <h1>Liste des commentaires</h1>
                    <div>{postIds.map((comment) => (
                        <div className="getpost-wrapper" key={comment.id}>
                            <div>Nom:{comment.User.userName}</div>
                            <div>Contenu GetPost:{comment.content}</div>
                            <div>Contenu URL:{comment.contentUrl}</div>
                            <div>id:{comment.id}</div>
                            <div>postId:{comment.postId}</div>  
                            <div className="getpost-footer"><Link to={{pathname: `/ModifyComment/${comment.id}`}}>Modifier</Link></div>
                            <div ><button className="getpost-delete-btn" onClick={()=>deleteComment(comment.id)}>Supprimer</button></div>               
                        </div>   
                    ))}
                    </div> 
            </div>
            <div className="getpost-footer"><Link to="/Home">Retour</Link></div>
        </div>  
    )
}







