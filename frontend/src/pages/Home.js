import axios from "axios";
import React, { Component } from "react";
import Post from "../components/Post.js";
//import { Link } from "react-router-dom";
import '../styles/Home.css';
import GetPost from "./GetPost.js";

export default class Home extends Component{
  constructor(props){
    super(props);
    this.state = {
      posts:[],
      selectedPostId: null,
    };
  }
  componentDidMount(){
    axios
      .get('http://localhost:3001/api/posts', {
        method: 'GET',
        headers: {
          'Content-type':'Application/json',
          'Authorization':`Bearer ${localStorage.getItem('token')}`
          },
      })
      .then((response) => {
        //console.log(response.data);
        const posts = [];
        for (let key in response.data) {
          posts.push({ ...response.data[key], id: key });
        }
        this.setState({
          posts:posts,
        })
      })
  }
  onPostClickHandler = (id) => {
    console.log(id);
    this.setState({selectedPostId: id,});
  }
  render(){
    const posts = this.state.posts.map((post) => {
      return <Post key={post.id} post={post} postclicked={this.onPostClickHandler.bind(
        this,
        post.id,
      )}/>
    })
    return(
      <div>
        <h1>Liste des Posts</h1>
        <p>nombre de posts:{this.state.posts.length}</p>
        <div>{posts}</div>
        {this.state.selectedPostId && (
        <div>
          <h2>Détail du post N°{this.state.selectedPostId}</h2>
        <GetPost id={this.state.selectedPostId}/></div>
        )}
      </div>
    )
  }
} 

/*class Home extends Component {
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
            <p><Link to={`/GetPost/${post.id}`} key={post.id} >Ouvrir</Link></p> 
          </div> 
         )}
      </div> 
    )
  }
}

export default Home;*/



