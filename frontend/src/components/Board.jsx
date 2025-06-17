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
            <img src={board.imageUrl} alt={board.title}></img>
            <h3>{board.author}</h3>
            <p>{board.description}</p>
        </div>
    )
}

export default Board;