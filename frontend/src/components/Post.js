import { Link } from "react-router-dom";

import '../styles/Post.css';

export function Post (props){
    const picture = props.post.contentUrl
    if (picture===null){
    return(
        <div className="post-wrapper-global">
            <div className="post-wrapper">
                <div className="post-wrapper-text">
                    <div className="post-name">{props.post.User.userName}</div>
                    <div className="post-title">{props.post.title}</div>
                    <div className="post-content">{props.post.content}</div> 
                </div>

            </div>
            <div className="post-wrapper-link">
                <Link to={{pathname: `/ModifyPost/${props.post.id}`}} className="post-link">Modifier le post</Link>
            </div>
            <div className="post-wrapper-link">
                <Link to={{pathname: `/GetPost/${props.post.id}`}} className="post-link">Voir les commentaires</Link>
            </div>
        </div>      
    )}
    else {
        return(
            <div className="post-wrapper-global">
            <div className="post-wrapper-picture">
                <div className="post-wrapper-text-picture">
                    <div className="post-name">{props.post.User.userName}</div>
                    <div className="post-title">{props.post.title}</div>
                    <div className="post-content">{props.post.content}</div> 
                </div>
                <div className="post-wrapper-img"><img src={props.post.contentUrl}/></div>
            </div>
            <div className="post-wrapper-link">
                <Link to={{pathname: `/ModifyPost/${props.post.id}`}} className="post-link">Modifier le post</Link>
            </div>
            <div className="post-wrapper-link">
                <Link to={{pathname: `/GetPost/${props.post.id}`}} className="post-link">Voir les commentaires</Link>
            </div>
        </div>    
        )
    }
}

export default Post;