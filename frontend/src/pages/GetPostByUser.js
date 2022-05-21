import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import 'moment/locale/fr';

import '../styles/GetPostByUser.css';

export default function GetPostByUser (data) {
    const [userIds, setUserIds] = useState([]);
    let {id} = useParams();
    
    console.log(id);
    localStorage.getItem('userId');
    
    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_URL}/posts/user?userId=${id}}`, {
          method: 'GET',
          headers: {
            'Authorization':`Bearer ${localStorage.getItem('token')}`
            },
        body: data,
        })
        .then(response => {
            console.log(response.data);
            setUserIds(
                response.data 
            )
        })
    },[]);
     
    return(
        <div>
            <div className="getpostbyuser-wrapper-global">
                <p>{userIds.length} post(s)</p>
                {userIds.map((post) => (
                    <div className="getpostbyuser-wrapper">
                        <div className="getpostbyuser-wrapper-text">
                            <div className="getpostbyuser-title">{post.title}</div>
                            <div className="getpostbyuser-date">Crée {moment(post.createdAt).fromNow()}</div>
                            <div className="getpostbyuser-wrapper-link">
                                <Link to={{pathname: `/getpostbyuser/${post.id}`}}>Voir le post</Link>
                            </div>
                        </div> 
                    </div> 
                ))}  
            </div>
            <div className="getpostbyuser-footer"><Link to="/Home">Retour à la liste des posts</Link></div>
        </div>
    )
}

