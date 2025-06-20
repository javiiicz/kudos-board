import "../styles/CardModal.css";
import DisplayCard from "./DisplayCard";
import { fetchRequest } from "../utils/utils";
import { useState, useEffect } from "react";
import Comment from "./Comment";
import MessageField from "./MessageField";

const CardModal = ({ selectedCard, setShowComments, handleError }) => {
    const [comments, setComments] = useState([]);
    const [commentForm, setCommentForm] = useState({
        message: "",
        author: "",
    });

    const backend_url = import.meta.env.VITE_BACKEND_URL;

    const fetchCommentsForCard = async (cardID) => {
        let fetchedComments = [];
        try {
            fetchedComments = await fetchRequest(
                `${backend_url}/cards/${cardID}/comments`,
                "GET"
            );
        } catch (e) {
            console.error("Error while fetching comments for a card", e);
            handleError(e);
        }
        setComments(fetchedComments);
    };

    const createComment = async (comment) => {
        try {
            await fetchRequest(
                `${backend_url}/cards/${selectedCard.id}/comments`,
                "POST",
                JSON.stringify(comment)
            );
        } catch (error) {
            console.error("Error while fetching board:", error);
            handleError(error);
        }
        fetchCommentsForCard(selectedCard.id);
    };

    const submitComment = (e) => {
        e.preventDefault();
        createComment(commentForm);
        setCommentForm({
            message: "",
            author: "",
        });
        fetchCommentsForCard(selectedCard.id);
    };

    useEffect(() => {
        fetchCommentsForCard(selectedCard.id);
    }, []);

    return (
        <div
            className="modal-overlay"
            onClick={() => {
                setShowComments(false);
            }}
        >
            <div
                className="card-modal-content"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div>
                    <DisplayCard card={selectedCard} />
                </div>
                <div className="comment-container">
                    {comments.length ? (
                        comments.map((comment) => <Comment comment={comment} />)
                    ) : (
                        <></>
                    )}
                </div>
                <MessageField
                    commentForm={commentForm}
                    setCommentForm={setCommentForm}
                    createComment={createComment}
                    submitComment={submitComment}
                />
            </div>
        </div>
    );
};

export default CardModal;
