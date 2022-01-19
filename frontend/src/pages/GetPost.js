import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Like from "../components/Like.js";

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
      const[postIds, setPostIds] = useState([]);
    useEffect(() => {
        axios
        .get(`http://localhost:3001/api/comments?postId=${id}`, {
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
        return(
            <div className="getpost-wrapper">
                {console.log(post)}
                {post &&(
                    <div>
                        <div>id:{post.id}</div>
                        <div>name:{post.name}</div>
                        <div>title:{post.title}</div>
                        <div>contentgetpost:{post.content}</div>
                        <div>
                            <Like /> 
                        </div>
                    </div>

                )}
                <div>
                <div className="getpost-footer"><Link to="/CommentList">Voir les commentaires</Link></div>
                <div className="getpost-footer"><Link to="/CreateComment">Creer un commentaire</Link></div>
                <div className="getpost-footer"><Link to="/Home">Retour</Link></div>
                </div>
                <div>
            <h1>Liste des commentaires</h1>
            
            <div>{postIds.map((comment) => (
                <div className="commentlist-wrapper" key={comment.id}>
                    <div>Nom:{comment.name}</div>
                    <div>Contenu:{comment.content}</div>
                    <div>id:{comment.id}</div>
                    <div>postId:{comment.postId}</div>
                    <div><Link to="/Home">Retour</Link></div>
                </div>
            ))}</div>   
        </div>
            </div>
            
        )
}







