import "../styles/Comment.css"

const Comment = ({comment}) => {
    return (
        <div className="comment">
            <h4>{comment.author ? comment.author : "no author"}</h4>
            <p>{comment.message}</p>
        </div>
    )
}

export default Comment;