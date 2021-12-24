import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../styles/Home.css';


let params = new URLSearchParams(document.location.search.substring(1)); 
let id = params.get("post.id");
console.log(id);

class GetPost extends Component {
  state = {
    posts: []
  }

  componentDidMount(){
    fetch('http://localhost:3001/api/posts'+id, {
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
        <h1>Détail du post</h1>
        {this.state.posts.map(post =>
          <div className='home-form' key={post.id}>
            <p>identifiant:{post.id}</p>
            <p>nom:{post.name}</p>
            <p>titre:{post.title}</p>
            <p>contenu:{post.content}</p>
            <p><Link to="/CreateComment">Créer un commentaire</Link></p> 
          </div> 
         )}
      </div> 
    )
  }
}

export default GetPost;

