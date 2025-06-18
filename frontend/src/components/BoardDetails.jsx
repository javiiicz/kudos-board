import Card from "./Card";
import "../styles/BoardDetails.css"

const BoardDetails = ({id, cards, currentBoard}) => {
    return (
        <>
            <h2>{currentBoard.title}</h2>
            {currentBoard.author && <h3>{currentBoard.author}</h3>}
            <p>{currentBoard.description}</p>
            <p>{currentBoard.category}</p>
            <div className="card-container">
                {cards.map(card => <Card key={card.id} card={card}/>)}
            </div>
        </>
    )
}

export default BoardDetails;