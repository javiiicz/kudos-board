import Card from "./Card";
import "../styles/BoardDetails.css";
import NewCardForm from "./NewCardForm";
import CardModal from "./CardModal";
import { useEffect, useState } from "react";

const BoardDetails = ({
    id,
    cards,
    currentBoard,
    deleteCard,
    toggleCardUpvote,
    showCardModal,
    setShowCardModal,
    gifSearch,
    setGifSearch,
    toggleCardPin,
    createCard
}) => {
    if (!currentBoard) {
        return <p>Loading</p>;
    }

    const [showComments, setShowComments] = useState(false)
    const [selectedCard, setSelectedCard] = useState(null);

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

    useEffect(() => {
        setShowComments(false)
    }, [])

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
            {showComments ? <CardModal selectedCard={selectedCard} setShowComments={setShowComments}/> : <></>} 
        </>
    );
};

export default BoardDetails;
