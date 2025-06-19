import "../styles/BoardPage.css";
import { useParams } from "react-router-dom";
import BoardDetails from "./BoardDetails";
import BoardHeader from "./BoardHeader";
import { useEffect } from "react";

const BoardPage = ({
    cards,
    fetchCardsForBoard,
    currentBoard,
    fetchBoardByID,
    deleteCard,
    toggleCardUpvote,
    showCardModal,
    setShowCardModal,
    cardFormData,
    setCardFormData,
    fetchGIFS,
    gifSearch,
    setGifSearch,
    gifResults,
    setGifResults,
    handleCardAddSubmit
}) => {
    const { id } = useParams();

    useEffect(() => {
        fetchCardsForBoard(id);
        fetchBoardByID(id);
    }, []);

    return (
        <>
            <BoardHeader setShowCardModal={setShowCardModal} />
            <main className="board-main">
                <BoardDetails
                    id={id}
                    cards={cards}
                    currentBoard={currentBoard}
                    deleteCard={deleteCard}
                    toggleCardUpvote={toggleCardUpvote}
                    showCardModal={showCardModal}
                    setShowCardModal={setShowCardModal}
                    cardFormData={cardFormData}
                    setCardFormData={setCardFormData}
                    fetchGIFS={fetchGIFS}
                    gifSearch={gifSearch}
                    setGifSearch={setGifSearch}
                    gifResults={gifResults}
                    setGifResults={setGifResults}
                    handleCardAddSubmit={handleCardAddSubmit}
                />
            </main>
        </>
    );
};

export default BoardPage;
