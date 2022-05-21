import { Link } from "react-router-dom";
import moment from "moment";
import 'moment/locale/fr';

import '../styles/Post.css';

export function Post (props){

    let currentUser = localStorage.getItem('userId');
    let userAdmin = localStorage.getItem('isAdmin')==='true';
    const picture = props.post.contentUrl
    const user = props.post.userId
    console.log(user);
    console.log(currentUser);
    console.log(userAdmin);

    return(
        <div className="post-wrapper-global">
            <div className="post-wrapper">
                <div className="post-wrapper-text">
                    <div className="post-name">{props.post.User.userName} a posté:</div>
                    <div className="post-name-text"></div>
                    <div className="post-title">{props.post.title}</div>
                    <div className="post-content">{props.post.content}</div> 
                    <div className="post-date">Crée {moment(props.post.createdAt).fromNow()}</div>
                    <div className="post-date">Modifié {moment(props.post.updatedAt).fromNow()}</div>
                </div>
                {(picture!=="null") && (
                <div className="post-wrapper-img"><img src={props.post.contentUrl}/></div>
                )}
            </div>
            {(currentUser==user || userAdmin==true) && (
                <div className="post-wrapper-link">
                <Link to={{pathname: `/ModifyPost/${props.post.id}`}} className="post-link">Modifier le post</Link>
            </div>
            )}
            <div className="post-wrapper-link">
                <Link to={{pathname: `/GetPost/${props.post.id}`}} className="post-link">Voir les commentaires</Link>
            </div>
            <div className="post-wrapper-link">
                <Link to={{pathname: `/GetUser/${props.post.userId}`}} className="post-link">Voir la fiche de {props.post.User.userName}</Link>
            </div>
        </div>      
    )
}
    
export default Post;