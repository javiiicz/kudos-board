import "../styles/Board.css"

const Board = ({board}) => {
    return (
        <div className="board">
            <h2>{board.title}</h2>
            <img src={board.image} alt={board.title}></img>
            <h3>{board.author}</h3>
            <p>{board.desc}</p>
        </div>
    )
}

export default Board;