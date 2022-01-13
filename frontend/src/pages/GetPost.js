import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import '../styles/GetPost.css';

export default function GetPost () {
    const [post, setPost] = useState({});
    let {id} = useParams();
    useEffect(() => {
        axios
        .get(`http://localhost:3001/api/posts/${id}}`, {
          method: 'GET',
          headers: {
            'Content-type':'Application/json',
            'Authorization':`Bearer ${localStorage.getItem('token')}`
            },
        })
        .then(response => {
            console.log(response.data);
            setPost(
                response.data 
            )
        })
      },[]);
        return(
            <div className="getpost-wrapper">
                {console.log(post)}
                {post &&(
                    <div>
                        <div>id:{post.id}</div>
                        <div>name:{post.name}</div>
                        <div>title:{post.title}</div>
                        <div>content:{post.content}</div>
                        <div>likes:{post.likes}</div>
                    </div>
                )}
                <div>
                <div className="getpost-footer"><Link to="/CommentList">Voir les commentaires</Link></div>
                <div className="getpost-footer"><Link to="/CreateComment">Creer un commentaire</Link></div>
                <div className="getpost-footer"><Link to="/Home">Retour</Link></div>
                </div>
            </div>
            
        )
}







