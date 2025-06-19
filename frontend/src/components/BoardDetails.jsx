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
    gifResults
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
            />
        );
    }

    return (
        <>
            <h2>{currentBoard.title}</h2>
            {currentBoard.author && <h3>{currentBoard.author}</h3>}
            <p>{currentBoard.category}</p>
            <div className="card-container">
                {cards.length ? (
                    cards.map((card) => (
                        <Card
                            key={card.id}
                            card={card}
                            deleteCard={deleteCard}
                            toggleCardUpvote={toggleCardUpvote}
                        />
                    ))
                ) : (
                    <p>No cards... Create some!</p>
                )}
            </div>
        </>
    );
};

export default BoardDetails;
