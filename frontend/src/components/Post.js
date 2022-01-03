import { Link } from "react-router-dom";
//import GetPost from "GetPost.js";

export function Post (props){
    return(
        <a href='#' onClick={props.postclicked}>
        
            <div>Id:{props.post.id}</div>
            <div>Name:{props.post.name}</div>
            <div>Title:{props.post.title}</div>
            <div>Contenu:{props.post.content}</div>
            <p><Link to={`/GetPost/${props.post.id}`}  >Ouvrir</Link></p> 
            
        </a>
    )
}

export default Post;