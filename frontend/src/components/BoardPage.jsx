import "../styles/BoardPage.css";
import { useParams } from "react-router-dom";
import BoardDetails from "./BoardDetails";
import BoardHeader from "./BoardHeader";
import { useEffect, useState } from "react";

const BoardPage = ({
    cards,
    fetchCardsForBoard,
    currentBoard,
    fetchBoardByID,
    deleteCard,
    toggleCardUpvote,
    toggleCardPin,
    createCard
}) => {
    const { id } = useParams();
    const [showCardModal, setShowCardModal] = useState(false);

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
                    toggleCardPin={toggleCardPin}
                    createCard={createCard}
                />
            </main>
        </>
    );
};

export default BoardPage;
