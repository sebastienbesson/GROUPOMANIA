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
                navigate("../Home")
            })
            })
        }
    return(
        <div className="getpost-wrapper-global">
            {console.log(post)}
            {post &&(
                <div className="getpost-wrapper">
                    <div className="getpost-wrapper-text">
                        <div className="getpost-title">{post.title}</div>
                        <div className="getpost-content">{post.content}</div>
                    </div>
                    <div className="getpost-wrapper-img"><img src={post.contentUrl}/></div>
                </div> 
            )}
            <div className="getpost-delete"><button onClick={()=>deletePost(post.id)} className="getpost-delete-btn">Supprimer le post</button></div>
            <div className="getpost-footer"><Link to={{pathname: `/ModifyPost/${post.id}`}}>Modifier le post</Link></div>
            <div className="getpost-footer"><Link to={{pathname: `/CreateComment/${post.id}`}}>Créer un commentaire</Link></div>
            <div className="getpost-footer"><Link to="/Home">Retour à la liste des posts</Link></div>
            <div>
                <p>{postIds.length} commentaire(s) pour ce post</p>
                <h1>Liste des commentaires</h1>
                    <div>{postIds.map((comment) => (
                        <div className="getpost-comment-wrapper" key={comment.id}>
                            <div className="getpost-comment-wrapper-text">
                                <div className="getpost-name">{comment.User.userName}:</div>
                                <div className="getpost-comment">{comment.content}</div>
                            </div>
                            <div className="getpost-comment-wrapper-function">
                                <div className="getpost-footer"><Link to={{pathname: `/ModifyComment/${comment.id}`}}>Modifier le commentaire</Link></div>
                                <div><button className="getpost-delete-btn" onClick={()=>deleteComment(comment.id)}>Supprimer le commentaire</button></div> 
                            </div>              
                        </div>   
                    ))}
                    </div> 
            </div>
            <div className="getpost-footer"><Link to="/Home">Retour à la liste des posts</Link></div>
        </div>  
    )
}







