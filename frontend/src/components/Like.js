import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import likeLogo from '../like.svg';
import dislikeLogo from '../dislike.svg';
import '../styles/Like.css';


const Like = () => {
    const [like, setLike]=useState(0);
    const [dislike, setDislike]=useState(0);
    /*let {id} = useParams();
    useEffect(() => {
        axios
        .get(`http://localhost:3001/api/posts/likes/${id}}`, {
          method: 'GET',
          headers: {
            'Content-type':'Application/json',
            'Authorization':`Bearer ${localStorage.getItem('token')}`
            },
        })
        .then(response => {
            console.log(response.data);
            setLike(
                response.data 
            )
        })
      },[]);*/
    return (
        <div className='like-wrapper'>
            <button className='like-logo-item' onClick={()=>setLike(like+1)}><img src={likeLogo} alt='like' className='like-logo' />{like}</button>
            <button className='like-logo-item' onClick={()=>setDislike(dislike+1)}><img src={dislikeLogo} alt='dislike' className='dislike-logo' />{dislike}</button>
        </div>
    )
}  

export default Like;