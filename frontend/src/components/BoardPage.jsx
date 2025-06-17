import "../styles/BoardPage.css";
import { useParams } from "react-router-dom";
import BoardDetails from "./BoardDetails";
import BoardHeader from "./BoardHeader"

const BoardPage = () => {
    const { id } = useParams();

    return (
        <>
            <BoardHeader/>
            <main className="board-main">
                <BoardDetails id={id} />
            </main>
        </>
    );
};

export default BoardPage;
