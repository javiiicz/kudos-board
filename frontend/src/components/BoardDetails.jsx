import Card from "./Card";
import "../styles/BoardDetails.css"

const BoardDetails = ({id, cards, currentBoard, deleteCard}) => {
    if (!currentBoard) {
        return (
            <p>Loading</p>
        )
    }
    
    return (
        <>
            <h2>{currentBoard.title}</h2>
            {currentBoard.author && <h3>{currentBoard.author}</h3>}
            <p>{currentBoard.category}</p>
            <div className="card-container">
                {cards.length ? (cards.map(card => <Card key={card.id} card={card} deleteCard={deleteCard}/>)) : (
                    <p>No cards... Create some!</p>
                )}
            </div>
        </>
    )
}

export default BoardDetails;