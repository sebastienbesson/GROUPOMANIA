import React, { Component } from "react";
import '../styles/Home.css';

class Home extends Component {
  state = {
    posts: []
  }

  componentDidMount(){
    fetch('http://localhost:3001/api/posts', {
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
  }
  render(){
    return (     
      <div className='home-wrapper'>
        <p>nombre de posts:{this.state.posts.length}</p>
        <p>Je créé un post<button>ici</button></p>
        <h1>Liste des Posts</h1>
        {this.state.posts.map(post =>
          <div className='home-form'>
            <p>nom:{post.name}</p>
            <p>titre:{post.title}</p>
            <p>contenu:{post.content}</p>
            <p>commentaires:<button>Cliquez ici</button></p>
          </div> 
         )}
      </div> 
    )
  }
}

export default Home;

