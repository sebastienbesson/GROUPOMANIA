import axios from "axios";
import React, { Component } from "react";
import Post from "../components/Post.js";
import { Link } from "react-router-dom";

import '../styles/Home.css';

export default class Home extends Component{
  constructor(props){
    super(props);
    this.state = {
      posts:[],
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
        <div className="home-header">
          <h1>Liste des Posts</h1>
            <p>{this.state.posts.length} posts en ligne!</p>
            <p><Link to="/CreatePost">Nouveau Post</Link></p>
        </div>
        <div className="home-global">
          <div>{posts}</div>  
        </div>
      </div>
    )
  }
} 





