import "../styles/Card.css";

const Card = ({ card }) => {
    let colors = ["yellow", "blue", "pink", "green"];
    let color = colors[Math.floor(Math.random() * 4)];
    let cardClass = "kudos-card " + color;

    return (
        <>
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
                    <p className="upvotes">300 Upvotes</p>
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
