import React, { Component } from "react";
import { Link } from "react-router-dom";
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
    console.log(result)
    this.setState({posts: result})
   
})
  }
  render(){
    return (     
      <div className='home-wrapper'>
        <p>nombre de posts:{this.state.posts.length}</p>
        <div>
        <p>
        <Link to="/CreatePost">Je crée un post Ici</Link>
        </p>
        </div>
        <h1>Liste des Posts</h1>
        {this.state.posts.map(post =>
          <div className='home-form' key={post.id}>
            <p>identifiant:{post.id}</p>
            <p>nom:{post.name}</p>
            <p>titre:{post.title}</p>
            <p>contenu:{post.content}</p>
            <p><Link to={`/GetPost/${post.id}`} key={post.id}>Ouvrir</Link></p> 
          </div> 
         )}
      </div> 
    )
  }
}

export default Home;

