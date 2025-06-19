import "../styles/Card.css";

const DisplayCard = ({
    card,
}) => {
    let cardClass =
        "kudos-card " + card.color

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
            </div>
        </>
    );
};

export default DisplayCard;
