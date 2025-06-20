import "../styles/Comment.css";

const Comment = ({ comment }) => {
    return (
        <div className="comment">
            <p>
                <span className="comment-author">
                    {comment.author ? comment.author : "No author"}:
                </span>{" "}
                {comment.message}
            </p>
        </div>
    );
};

export default Comment;
