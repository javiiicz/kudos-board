import Card from "./Card";
import "../styles/BoardDetails.css"

const BoardDetails = ({id, cards}) => {
    return (
        <>
            <h2>ID = {id}</h2>
            <div className="card-container">
                {cards.map(card => <Card key={card.id} card={card}/>)}
            </div>
        </>
    )
}

export default BoardDetails;