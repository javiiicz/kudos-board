import { Heart, Pin, Trash } from "lucide-react";
import "../styles/Card.css";

const Card = ({ card, deleteCard, toggleCardUpvote, toggleCardPin }) => {
    let cardClass = "kudos-card " + card.color + (card.is_pinned ? " pinned" : "");

    let pinClass = "card-button pin " + (card.is_pinned ? "active" : "" )
    return (
        <>
            <div className={cardClass}>
                <div className="card-content">
                    <div className="image-container">
                        <img
                            src={card.gifUrl}
                            alt="Kudos Card Gif"
                            className="kudos-card-image"
                        ></img>
                    </div>
                    <h4>{card.author ? card.author : "No Author"}</h4>
                    <p>{card.message}</p>
                    <p className="upvotes">
                        {card.upvotes}{" "}
                        {card.upvotes === 1 ? "Upvote" : "Upvotes"}
                    </p>
                </div>
                <div className="card-button-container">
                    <button
                        className={pinClass}
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleCardPin(card.id);
                        }}
                    >
                        {<Pin size={20}/>}
                    </button>
                    <button
                        className="card-button heart"
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleCardUpvote(card.id);
                        }}
                    >
                        {card.liked ? <Heart size={20} fill={'red'} color={'red'}/> : <Heart size={20}/>}
                    </button>
                    <button
                        className="card-button trash"
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteCard(card.id);
                        }}
                    >
                        <Trash size={20}/>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Card;
