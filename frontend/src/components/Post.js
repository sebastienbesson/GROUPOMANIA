import { Link } from "react-router-dom";

import '../styles/Post.css';


export function Post (props){
    return(
        <div className="post-wrapper-global">
            <div>Id:{props.post.id}</div>
            <div>Name:{props.post.name}</div>
            <div>Title:{props.post.title}</div>
            <div>Contenu:{props.post.content}</div>
            <div>Likes:{props.post.likes}</div>
            <div className="post-wrapper">
                <div className="post-wrapper-link">
                    <Link to={{pathname: `/GetPost/${props.post.id}`}} >Ouvrir</Link>
                </div>
                <p>commentaire(s) sur ce post</p>
            </div>
        </div>       
    )
}

export default Post;