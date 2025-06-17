import "../styles/BoardPage.css";
import { useParams } from "react-router-dom";
import BoardDetails from "./BoardDetails";
import BoardHeader from "./BoardHeader"
import { useEffect } from "react";

const BoardPage = ({cards, fetchCardsForBoard}) => {
    const { id } = useParams();

    useEffect(() => {
        fetchCardsForBoard(id)
    }, [])

    return (
        <>
            <BoardHeader/>
            <main className="board-main">
                <BoardDetails id={id} cards={cards}/>
            </main>
        </>
    );
};

export default BoardPage;
