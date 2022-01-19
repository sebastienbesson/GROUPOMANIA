import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
//import Comment from "../components/Comment.js";

import '../styles/CommentList.css';


/*export default function CommentList () {
  const [comment, setComment] = useState({});
  useEffect(() => {
      axios
      .get('http://localhost:3001/api/comments', {
        method: 'GET',
        headers: {
          'Content-type':'Application/json',
          'Authorization':`Bearer ${localStorage.getItem('token')}`
          },
      })
      .then(response => {
          console.log(response.data);
          setComment(
              response.data 
          )
      })
    },[]);
      return(
          <div className="commentlist-wrapper">
              {console.log(comment)}
              < Comment 
                  comment={comment}
              />
              <div>
              <Link to="/Home">Retour</Link>
              
              </div>
          </div>
          
      )
}*/

const CommentList = () => {
    //const[comments, setComments] = useState([]);
    const[postIds, setPostIds] = useState([]);
    useEffect(() => {
        axios
        .get('http://localhost:3001/api/comments', {
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
    );
};

export default CommentList;