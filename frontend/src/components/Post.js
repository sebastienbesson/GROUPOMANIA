import { Link } from "react-router-dom";

import '../styles/Post.css';

//let postId = localStorage.getItem('id');

export function Post (props){
    return(
        //<a href='#' onClick={props.postclicked}>
        <div className="post-wrapper-global">
            <div>Id:{props.post.id}</div>
            <div>Name:{props.post.name}</div>
            <div>Title:{props.post.title}</div>
            <div>Contenu:{props.post.content}</div>
            <div>Likes:{props.post.likes}</div>
            <div className="post-wrapper">
                <Link to={{pathname: `/GetPost/${props.post.id}`}} >Ouvrir</Link>
                <p>afficher le nb de commentaires sur ce post</p>
            </div>
        </div>
        //</a>
        
    )
}

export default Post;