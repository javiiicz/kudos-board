import "../styles/BoardDisplay.css";
import Board from "./Board";
import NewBoardSection from "./NewBoardSection";
import WelcomeBoard from "./WelcomeBoard";

const BoardDisplay = ({ boards, showModal, setShowModal }) => {
    if (showModal) {
        return (
            <NewBoardSection setShowModal={setShowModal}/>
        );
    }

    return (
        <div className="board-container">
            {boards.length ? (
                boards.map((board) => <Board key={board.id} board={board} />)
            ) : (
                <WelcomeBoard />
            )}
        </div>
    );
};

export default BoardDisplay;
