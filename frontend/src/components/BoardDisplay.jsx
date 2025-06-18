import "../styles/BoardDisplay.css";
import Board from "./Board";
import NewBoardSection from "./NewBoardSection";
import WelcomeBoard from "./WelcomeBoard";

const BoardDisplay = ({ boards, showModal, setShowModal, handleAddSubmit }) => {
    if (showModal) {
        return (
            <NewBoardSection setShowModal={setShowModal} handleAddSubmit={handleAddSubmit}/>
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
