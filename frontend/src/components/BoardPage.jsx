import "../styles/BoardPage.css";
import { useParams } from "react-router-dom";
import BoardDetails from "./BoardDetails";
import BoardHeader from "./BoardHeader";
import { useState } from "react";


const BoardPage = ({ handleError }) => {
    const { id } = useParams();
    const [showCardModal, setShowCardModal] = useState(false);

    return (
        <>
            <BoardHeader setShowCardModal={setShowCardModal} />
            <main className="board-main">
                <BoardDetails
                    id={id}
                    showCardModal={showCardModal}
                    setShowCardModal={setShowCardModal}
                    handleError={handleError}
                />
            </main>
        </>
    );
};

export default BoardPage;
