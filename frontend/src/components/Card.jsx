import { Heart, Trash } from "lucide-react";
import "../styles/Card.css";

const Card = ({ card, deleteCard, toggleCardUpvote }) => {
    let cardClass = "kudos-card " + card.color;

    let likeClass = "card-button heart"
    return (
        <>
            <div className={cardClass}>
                <div className="card-content">
                    <h3>{card.title}</h3>
                    <div className="image-container">
                        <img
                            src={card.gifUrl}
                            alt="Kudos Card Gif"
                            className="kudos-card-image"
                        ></img>
                    </div>
                    <h4>{card.author ? card.author : "No Author"}</h4>
                    <p>{card.description}</p>
                    <p className="upvotes">
                        {card.upvotes}{" "}
                        {card.upvotes === 1 ? "Upvote" : "Upvotes"}
                    </p>
                </div>
                <div className="card-button-container">
                    <button
                        className={likeClass}
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
