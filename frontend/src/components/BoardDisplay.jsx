import "../styles/BoardDisplay.css"
import Board from "./Board"

let placeholderBoard = {title: 'School Board', image: 'https://placehold.co/600x400', author: 'Javier Carrillo', desc: "hello this is a placeholder"}

const BoardDisplay = () => {
    return (
        <div className="board-container">
            <Board board={placeholderBoard}/>
            <Board board={placeholderBoard}/>
            <Board board={placeholderBoard}/>
            <Board board={placeholderBoard}/>
            <Board board={placeholderBoard}/>
            <Board board={placeholderBoard}/>
            <Board board={placeholderBoard}/>
            <Board board={placeholderBoard}/>
            <Board board={placeholderBoard}/>
            <Board board={placeholderBoard}/>
            <Board board={placeholderBoard}/>
            <Board board={placeholderBoard}/>
            <Board board={placeholderBoard}/>
            <Board board={placeholderBoard}/>
        </div>
    )
}

export default BoardDisplay;