import "../styles/BoardDisplay.css"
import Board from "./Board"

let placeholderList = [{id: 1, title: 'School Board', image: 'https://placehold.co/600x400', author: 'Javier Carrillo', desc: "hello this is a placeholder"}, {id: 2, title: 'Congrats', image: 'https://placehold.co/600x400', author: 'Roy Carrillo', desc: "hello this is a placeholder"}] 

const BoardDisplay = () => {
    return (
        <div className="board-container">
            {placeholderList.map(board => <Board board={board}/>)}
        </div>
    )
}

export default BoardDisplay;