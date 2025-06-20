import "../styles/CardModal.css";
import DisplayCard from "./DisplayCard";
import { fetchRequest } from "../utils/utils";
import { useState, useEffect } from "react";
import Comment from "./Comment";

const CardModal = ({ selectedCard, setShowComments }) => {
    const [comments, setComments] = useState([]);

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

    useEffect(() => {
        console.log("fetching")
        fetchCommentsForCard(selectedCard.id)
    }, [])

    return (
        <div
            className="modal-overlay"
            onClick={() => {
                setShowComments(false);
            }}
        >
            <div className="card-modal-content">
                <div>
                    <DisplayCard card={selectedCard} />
                </div>
                <div>
                    {comments.length ? (comments.map(comment => <Comment comment={comment}/>)) : <></>}
                </div>
            </div>
        </div>
    );
};

export default CardModal;
