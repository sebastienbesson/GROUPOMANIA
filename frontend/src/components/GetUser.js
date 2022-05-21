import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import '../styles/GetUser.css';

export default function GetUser (data) {
    const [user, setUser] = useState({});
    let {id} = useParams();
    
    console.log(id);
    localStorage.getItem('userId');
    
    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_URL}/auth/user/${id}}`, {
          method: 'GET',
          headers: {
            'Authorization':`Bearer ${localStorage.getItem('token')}`
            },
        body: data,
        })
        .then(response => {
            setUser(
                response.data 
            )
        })
      },[]);

    return(
        <div>
            <div className="getuser-wrapper-global">
                {user &&(
                    <div className="getuser-wrapper">
                        <div className="getuser-wrapper-text">
                            <div className="getuser-name">{user.userName}</div>
                            <div className="getuser-wrapper-text-picture"><img src={user.contentUrl}/></div>
                        </div>
                    </div> 
                )}
                <div className="getuser-footer"><Link to="/Home">Retour à la liste des posts</Link></div>
                <div className="getuser-footer"><Link to={{pathname: `/GetPostByUser/${id}`}}>Voir les posts de {user.userName}</Link></div>
            </div>
        </div>        
    )
}


   
