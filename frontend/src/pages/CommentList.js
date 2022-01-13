import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Comment from "../components/Comment.js";

import '../styles/CommentList.css';


export default function CommentList () {
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
  }
