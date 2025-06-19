import Card from "./Card";
import "../styles/BoardDetails.css";
import NewCardForm from "./NewCardForm";

const BoardDetails = ({
    id,
    cards,
    currentBoard,
    deleteCard,
    toggleCardUpvote,
    showCardModal,
    setShowCardModal,
    fetchGIFS,
    gifSearch,
    setGifSearch,
    gifResults,
    cardFormData,
    setCardFormData,
    setGifResults,
    handleCardAddSubmit,
}) => {
    if (!currentBoard) {
        return <p>Loading</p>;
    }

    if (showCardModal) {
        return (
            <NewCardForm
                setShowCardModal={setShowCardModal}
                fetchGIFS={fetchGIFS}
                gifSearch={gifSearch}
                setGifSearch={setGifSearch}
                gifResults={gifResults}
                cardFormData={cardFormData}
                setCardFormData={setCardFormData}
                setGifResults={setGifResults}
                handleCardAddSubmit={handleCardAddSubmit}
            />
        );
    }

    let pinnedCards = cards.filter((x) => x.is_pinned);
    let unpinnedCards = cards.filter((x) => !x.is_pinned);
    pinnedCards.sort((a, b) => {
        let dateA = new Date(a.pinned_at)
        let dateB = new Date(b.pinned_at)
        return dateA - dateB;
    })

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
                                {unpinnedCards.length &&
                                    unpinnedCards.map((card) => (
                                        <Card
                                            key={card.id}
                                            card={card}
                                            deleteCard={deleteCard}
                                            toggleCardUpvote={toggleCardUpvote}
                                        />
                                    ))}
                            </div>
                        </>
                    ) : (
                        <p>No cards... Create some!</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default BoardDetails;
