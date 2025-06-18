import "../styles/Board.css";
import { useNavigate } from "react-router-dom";

const Board = ({ board }) => {
    const navigate = useNavigate();

    const handleBoardClick = () => {
        navigate(`/boards/${board.id}`);
    };

    return (
        <div className="board" onClick={handleBoardClick}>
            <h2>{board.title}</h2>
            <img
                src={board.imageUrl}
                alt={board.title}
                className="board-image"
            ></img>
            <div className="category">
                <p>{board.category}</p>
            </div>
            <div className="board-button-container">
                <button
                    className="card-button trash"
                    onClick={() => {
                        deleteCard(card.id);
                    }}
                >
                    🗑️
                </button>
            </div>
        </div>
    );
};

export default Board;
