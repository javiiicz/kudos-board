import "../styles/Board.css"
import { useNavigate } from "react-router-dom";

const Board = ({board}) => {
    const navigate = useNavigate()

    const handleBoardClick = () => {
        navigate(`/boards/${board.id}`);
    };

    return (
        <div className="board" onClick={handleBoardClick}>
            <h2>{board.title}</h2>
            <img src={board.imageUrl} alt={board.title} className="board-image"></img>
            <h3 className="author">By {board.author}</h3>
            <p className="board-desc">{board.description}</p>
            <div className="category">
                <p>{board.category}</p>
            </div>
        </div>
    )
}

export default Board;