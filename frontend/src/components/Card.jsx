import "../styles/Card.css";

const Card = ({ card }) => {
    let colors = ["yellow", "blue", "pink", "green"];
    let color = colors[Math.floor(Math.random() * 4)];
    let cardClass = "kudos-card " + color;

    return (
        <div className={cardClass}>
            <div className="card-content">
                <h3>{card ? card.title : "Placeholder Title"}</h3>
                <div className="image-container">
                    <img
                        src={card ? card.image : "/snoopy.gif"}
                        alt="Welcome board image"
                        className="kudos-card-image"
                    ></img>
                </div>
                <h4>{card ? card.author : "No Author"}</h4>
                <p>Congratulations!</p>
            </div>
        </div>
    );
};

export default Card;
