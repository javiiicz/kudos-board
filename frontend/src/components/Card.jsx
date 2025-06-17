import "../styles/Card.css";

const Card = ({ card }) => {
    let colors = ["yellow", "blue", "pink", "green"];
    let color = colors[Math.floor(Math.random() * 4)];
    let cardClass = "kudos-card " + color;
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
                    <p className="upvotes">{card.upvotes} {card.upvotes === 1 ? "Upvote" : "Upvotes"}</p>
                </div>
                <div className="card-button-container">
                    <button className="card-button heart">❤️</button>
                    <button className="card-button trash">🗑️</button>
                </div>
            </div>
        </>
    );
};

export default Card;
