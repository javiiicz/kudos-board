import { ArrowUp } from "lucide-react";
import "../styles/MessageField.css";

const MessageField = ({ commentForm, setCommentForm, createComment, submitComment }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCommentForm({
            ...commentForm,
            [name]: value,
        });
    };

    return (
        <form
            className="comment-form"
            onSubmit={(e) => {
                submitComment(e)
                }}
        >
            <div className="inputs">
                <input
                    type="text"
                    placeholder="Author?"
                    value={commentForm.author}
                    name="author"
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    placeholder="Message"
                    value={commentForm.message}
                    name="message"
                    onChange={handleInputChange}
                    required
                />
            </div>
            <button type="submit">
                <ArrowUp />
            </button>
        </form>
    );
};

export default MessageField;
