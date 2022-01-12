import axios from "axios";
import React, { Component } from "react";
//import { useParams } from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import '../styles/Home.css';
import Comment from "../components/Comment.js";

//import GetPost from "./GetPost.js";

/*export default class CommentList extends Component{
  constructor(props){
    super(props);
    this.state = {
      comments:[],
      selectedPostId: null,
    };
  }
  componentDidMount(){
    axios
      .get('http://localhost:3001/api/comments', {
        method: 'GET',
        headers: {
          'Content-type':'Application/json',
          'Authorization':`Bearer ${localStorage.getItem('token')}`
          },
      })
      .then((response) => {
        //console.log(response.data);
        const comments = [];
        for (let key in response.data) {
          comments.push({ ...response.data[key], postId: key });
        }
        this.setState({
          comments:comments,
        })
      })
  }
  onPostClickHandler = (postId) => {
    console.log(id);
    this.setState({selectedPostId: postId,});
    //localStorage.setItem('id', id);
  }
  render(){
    const comments = this.state.comments.map((comment) => {
      return <Comment key={comment.postId} comment={comment} postclicked={this.onPostClickHandler.bind(
        this,
        comment.postId,
      )}/>
    })
    return(
      <div> 
        
        <h1>Liste des Comments</h1>
        <p>nombre de comments:{this.state.comments.length}</p>
        <div className="home-global">
          <div>{comments}</div>
        </div>
        <div>
        <Link to="/Home">Retour</Link>
        </div>
      </div>
    )
  }
}*/

export default function CommentList () {
  const [comment, setComment] = useState({});
  //let {postId} = useParams();
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
          //let postId = localStorage.setItem('id');
      })
    },[]);
      return(
          <div className="getpost-wrapper">
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
//let postId = localStorage.getItem('id');

/*class CommentList extends Component {
    state = {
      comments: [],
      //key: {postId}
    }
  
    componentDidMount(){
      fetch('http://localhost:3001/api/comments', {
      method: 'GET',
      headers: {
        'Content-type':'Application/json',
        'Authorization':`Bearer ${localStorage.getItem('token')}`
        },
    })
    .then(response => {return response.json()})
    .then(result => {
      console.log(result)
      this.setState({comments: result})
     
  })
    }
    render(){
      return (     
        <div className='home-wrapper'>
          <p>nombre de comments:{this.state.comments.length}</p>
          <div>
          
          </div>
          <h1>Liste des Comments</h1>
          {this.state.comments.map(comment =>
            <div className='home-form' >
              <p>identifiant:{comment.id}</p>
              <p>nom:{comment.name}</p>
              <p>postId:{comment.postId}</p>
              <p>contenu:{comment.content}</p>
              <Link to="/Home">Retour</Link>
            </div> 
           )}
        </div> 
      )
    }
  }*/
  
  //export default CommentList