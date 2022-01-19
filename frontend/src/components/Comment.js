

import '../styles/Comment.css';

export function Comment (props){
    
    return(
        <div className="comment-wrapper-global">
            <div>Id depuis comment js:{ props.comment.id}</div>
            <div>postId:{props.comment.name}</div>
            <div>Name:{props.comment.title}</div>
            <div>Content:{props.comment.content}</div>
            
        </div>
        
    )
}

export default Comment;