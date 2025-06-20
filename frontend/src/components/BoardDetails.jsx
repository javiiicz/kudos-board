import Card from "./Card";
import "../styles/BoardDetails.css";
import NewCardForm from "./NewCardForm";
import CardModal from "./CardModal";
import { useEffect, useState } from "react";
import { fetchRequest } from "../utils/utils";

const BoardDetails = ({ id, handleError, showCardModal, setShowCardModal }) => {
    const [cards, setCards] = useState([]);
    const [currentBoard, setCurrentBoard] = useState(null);
    const [showComments, setShowComments] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    const backend_url = import.meta.env.VITE_BACKEND_URL;

    const fetchCardsForBoard = async (boardID) => {
        let fetchedCards = [];
        try {
            fetchedCards = await fetchRequest(
                `${backend_url}/boards/${boardID}/cards`,
                "GET"
            );
        } catch (e) {
            console.error("Error while fetching cards for a board", e);
            handleError(e);
        }
        setCards(fetchedCards);
    };

    const createCard = async (card) => {
        try {
            await fetchRequest(
                `${backend_url}/boards/${currentBoard.id}/cards`,
                "POST",
                JSON.stringify(card)
            );
        } catch (error) {
            console.error("Error while fetching board:", error);
            handleError(error);
        }
        fetchCardsForBoard(currentBoard.id);
    };

    const fetchBoardByID = async (boardID) => {
        let fetchedBoard = null;
        try {
            fetchedBoard = await fetchRequest(
                `${backend_url}/boards/${boardID}`,
                "GET"
            );
        } catch (e) {
            console.error("Error while fetching board:", e);
            handleError(e);
        }
        setCurrentBoard(fetchedBoard);
    };

    const deleteCard = async (cardID) => {
        try {
            let data = await fetchRequest(
                `${backend_url}/cards/${cardID}`,
                "DELETE"
            );
            fetchCardsForBoard(data.boardId);
        } catch (error) {
            console.error("Fetch error:", error);
            handleError(error);
            throw error;
        }
    };

    const toggleCardUpvote = async (cardID) => {
        try {
            let data = await fetchRequest(
                `${backend_url}/cards/${cardID}/like`,
                "PATCH"
            );
            fetchCardsForBoard(data.boardId);
        } catch (error) {
            console.error("Fetch error:", error);
            handleError(error);
        }
    };

    const toggleCardPin = async (cardID) => {
        try {
            let data = await fetchRequest(
                `${backend_url}/cards/${cardID}/pin`,
                "PATCH"
            );
            fetchCardsForBoard(data.boardId);
        } catch (error) {
            console.error("Fetch error:", error);
            handleError(error);
        }
    };

    useEffect(() => {
        fetchCardsForBoard(id);
        fetchBoardByID(id);
    }, []);

    useEffect(() => {
        setShowComments(false);
    }, []);

    if (!currentBoard) {
        return <p>Loading</p>;
    }

    if (showCardModal) {
        return (
            <NewCardForm
                setShowCardModal={setShowCardModal}
                createCard={createCard}
            />
        );
    }

    let pinnedCards = cards.filter((x) => x.is_pinned);
    let unpinnedCards = cards.filter((x) => !x.is_pinned);
    pinnedCards.sort((a, b) => {
        let dateA = new Date(a.pinned_at);
        let dateB = new Date(b.pinned_at);
        return dateA - dateB;
    });

    return (
        <>
            <div className="board-details">
                <div className="board-details-container">
                    <img
                        src={currentBoard.imageUrl}
                        alt={currentBoard.title}
                        className="board-details-image"
                    ></img>
                    <div>
                        <h2>{currentBoard.title}</h2>
                        {currentBoard.author && <h3>{currentBoard.author}</h3>}
                        <p>{currentBoard.category}</p>
                    </div>
                </div>
                <div className="card-container">
                    {cards.length ? (
                        <>
                            {pinnedCards.length ? (
                                <>
                                    <h3>Pinned Cards</h3>
                                    <div className="pinned-section">
                                        {pinnedCards.length &&
                                            pinnedCards.map((card) => (
                                                <Card
                                                    key={card.id}
                                                    card={card}
                                                    deleteCard={deleteCard}
                                                    toggleCardUpvote={
                                                        toggleCardUpvote
                                                    }
                                                    toggleCardPin={
                                                        toggleCardPin
                                                    }
                                                    setSelectedCard={
                                                        setSelectedCard
                                                    }
                                                    setShowComments={
                                                        setShowComments
                                                    }
                                                />
                                            ))}
                                        {}
                                    </div>
                                </>
                            ) : (
                                <></>
                            )}
                            {pinnedCards.length ? (
                                <h3>Unpinned Cards</h3>
                            ) : (
                                <></>
                            )}
                            <div className="unpinned-section">
                                {unpinnedCards.length ? (
                                    unpinnedCards.map((card) => (
                                        <Card
                                            key={card.id}
                                            card={card}
                                            deleteCard={deleteCard}
                                            toggleCardUpvote={toggleCardUpvote}
                                            toggleCardPin={toggleCardPin}
                                            setSelectedCard={setSelectedCard}
                                            setShowComments={setShowComments}
                                        />
                                    ))
                                ) : (
                                    <></>
                                )}
                            </div>
                        </>
                    ) : (
                        <p>No cards... Create some!</p>
                    )}
                </div>
            </div>
            {showComments ? (
                <CardModal
                    selectedCard={selectedCard}
                    setShowComments={setShowComments}
                    handleError={handleError}
                />
            ) : (
                <></>
            )}
        </>
    );
};

export default BoardDetails;
