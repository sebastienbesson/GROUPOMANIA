import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import 'moment/locale/fr';
import '../styles/GetPost.css';

export default function GetPost (data) {
    const [post, setPost] = useState({});
    let {id} = useParams();
    
    console.log(id);
        
    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_URL}/posts/${id}}`, {
            method: 'GET',
            headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`},
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
    let currentUser = localStorage.getItem('userId');
    let userAdmin = localStorage.getItem('isAdmin')==='true';
    console.log(userAdmin);
    
    function deletePost(id)
        {fetch(`${process.env.REACT_APP_URL}/posts/${id}}`,{
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
        {fetch(`${process.env.REACT_APP_URL}/comments/${id}`,{
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
            })
            })
        }

    const picture = post.contentUrl
    const user = post.userId

    return(
        <div>
            <div className="getpost-wrapper-global">
                {console.log(post)}
                {post &&(
                    <div className="getpost-wrapper">
                        <div className="getpost-wrapper-text">
                            <div className="getpost-title">{post.title}</div>
                            <div className="getpost-content">{post.content}</div>
                            <div className="getpost-date">Cr??e {moment(post.createdAt).fromNow()}</div>
                            <div className="getpost-date">Modifi?? {moment(post.updatedAt).fromNow()}</div>
                        </div>
                    </div> 
                )}
                {(picture!==null) && (
                    <div className="getpost-wrapper-img"><img src={post.contentUrl}/></div>
                )}
                {(currentUser==user || userAdmin==true) && (
                    <div>
                        <div><button className="getpost-delete" onClick={()=>deletePost(post.id)}>Supprimer le post</button></div>
                        <div className="getpost-footer"><Link to={{pathname: `/ModifyPost/${post.id}`}}>Modifier le post</Link></div>
                    </div>
                )}
                <div className="getpost-footer"><Link to={{pathname: `/CreateComment/${post.id}`}}>Cr??er un commentaire</Link></div>
                <div className="getpost-footer"><Link to="/Home">Retour ?? la liste des posts</Link></div>
            </div>
            <div>
                <p>{postIds.length} commentaire(s) pour ce post</p>
                <h1>Liste des commentaires</h1>
                <div>{postIds.map((comment) => (
                    <div className="getpost-comment-wrapper" key={comment.id}>
                        <div className="getpost-comment-wrapper-text">
                            <div className="getpost-comment-name">{comment.User.userName}:</div>
                            <div className="getpost-comment-content">{comment.content}</div>
                            <div className="getpost-date">Cr??e {moment(comment.createdAt).fromNow()}</div>
                            <div className="getpost-date">Modifi?? {moment(comment.updatedAt).fromNow()}</div>
                        </div>
                        {(currentUser==comment.userId || userAdmin==true) && (
                        <div className="getpost-comment-wrapper-function">
                            {console.log((userAdmin==true || currentUser==comment.userId),userAdmin==true , currentUser==comment.userId)}
                            <div className="getpost-footer"><Link to={{pathname: `/ModifyComment/${comment.id}`}}>Modifier le commentaire</Link></div>
                            <div><button className="getpost-delete" onClick={()=>deleteComment(comment.id)}>Supprimer le commentaire</button></div> 
                        </div>  
                        )}    
                        <div className="getpost-footer">
                            <Link to={{pathname: `/GetUser/${comment.userId}`}}>Voir la fiche de {comment.User.userName}</Link>
                        </div> 
                    </div>   
                ))}
                </div> 
            </div>
            <div className="getpost-footer"><Link to="/Home">Retour ?? la liste des posts</Link></div>
        </div>
    )
}

