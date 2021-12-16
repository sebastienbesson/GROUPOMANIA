import React from "react";
import '../styles/Home.css';


fetch('http://localhost:3001/api/posts'+id, {
    method: 'GET',
    headers: {
      'Content-type':'Application/json',
      'Authorization':`Bearer ${localStorage.getItem('token')}`
      },
  })
  .then(response => {return response.json()})
  .then(result => {
    this.setState({posts: result})
    console.log(result)
})
