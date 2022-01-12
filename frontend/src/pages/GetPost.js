import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
//import axios from "axios";
import { useState, useEffect } from "react";
//import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import '../styles/GetPost.css';

//let postId = localStorage.getItem('id');

export default function GetPost () {
    const [post, setPost] = useState({});
    let {id} = useParams();
    useEffect(() => {
        axios
        .get(`http://localhost:3001/api/posts/${id}}`, {
          method: 'GET',
          headers: {
            'Content-type':'Application/json',
            'Authorization':`Bearer ${localStorage.getItem('token')}`
            },
        })
        .then(response => {
            console.log(response.data);
            setPost(
                response.data 
            )
            //let postId = localStorage.setItem('id');
        })
      },[]);

   
    
        return(
            <div className="getpost-wrapper">
                {console.log(post)}
                {post &&(
                    <div>
                        <div>id:{post.id}</div>
                        <div>name:{post.name}</div>
                        <div>title:{post.title}</div>
                        <div>content:{post.content}</div>
                        <div>likes:{post.likes}</div>
                    </div>
                )}
                <div>
                <Link to="/Home">Retour</Link>
                <Link to="/CreateComment">Creer un commentaire depuis getpost</Link>
                <Link to="/CommentList">Voir les commentaires depuis getpost</Link>
                </div>
            </div>
            
        )
    }



/*let params = new URLSearchParams(document.location.search.substring(1)); 
let id = params.get('id'); 
console.log(id);

export default class GetPost extends Component{
    constructor (props){
        super(props);
        this.state={
            post:null,
        };
        console.log(props);
    }
    componentDidMount(){
        fetch(`http://localhost:3001/api/posts/${id}`, {
            method: 'GET',
            headers: {
                'Content-type':'Application/json',
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            },
        })
        //axios.get(`http://localhost:3001/api/posts/${this.props.id}`)
        .then((response) =>{
            this.setState({
                post: {...response.data, id:this.props.id},
            });
        });
    }
    render(){
        return(
            <div>
                {this.state.post && (
                    <div>
                        <div>Id:{this.state.post.id}</div>
                        <div>Nom:{this.state.post.name}</div>
                        <div>Titre:{this.state.post.title}</div>
                        <div>Contenu:{this.state.post.content}</div>
                    </div>
                )}
            </div>
        )
    }
}*/

/*const GetPost = () => {
    const { id } = useParams();
    const { name } = useParams(id);
    const { title } = useParams();
    const { content } = useParams();
    console.log({id});
    console.log({name});
    return (
        <div>
            <h1>Détail du post n° { id }</h1>
            <p>Nom: { name}</p>
            <p>Titre: { title }</p>
            <p>Contenu:{ content }</p>
            <p><Link to="/Home">Retour</Link></p> 
        </div>
    );
}*/
    
/*let params = new URLSearchParams(document.location.search.substring(1)); 
let id = params.get('post.id');
console.log(id);

class GetPost extends Component {
  state = {
    post: []
  }

  componentDidMount(){
    fetch('http://localhost:3001/api/posts/'+id, {
    method: 'GET',
    headers: {
      'Content-type':'Application/json',
      'Authorization':`Bearer ${localStorage.getItem('token')}`
      },
  })
  .then(response => {return response.json()})
  .then(result => {
    console.log(result)
    this.setState({post: result})
   
})
  }
  render(){
    return (     
      <div className='home-wrapper'>
        
        <div>
        
        </div>
        <h1>Détail du post{id}</h1>
        <p>Nom:{this.state.post.name}</p>
        <p>Titre:{this.state.post.title}</p>
        <p>Contenu:{this.state.post.content}</p>
        <p><Link to="/Home">Retour</Link></p> 
      </div> 
    )
  }
}*/




