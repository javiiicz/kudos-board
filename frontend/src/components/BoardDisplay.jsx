import "../styles/BoardDisplay.css";
import Board from "./Board";
import WelcomeBoard from "./WelcomeBoard";

const BoardDisplay = ({boards}) => {
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
