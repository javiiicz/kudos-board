import "../styles/Board.css"
import { useNavigate } from "react-router-dom";

const Board = ({board}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/boards/${board.id}`)
    }

    return (
        <div className="board" onClick={handleClick}>
            <h2>{board.title}</h2>
            <img src={board.image} alt={board.title}></img>
            <h3>{board.author}</h3>
            <p>{board.desc}</p>
        </div>
    )
}

export default Board;