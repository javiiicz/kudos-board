import "../styles/BoardDisplay.css";
import Board from "./Board";
import WelcomeBoard from "./WelcomeBoard";

let list = [
    {
        id: 1,
        title: "School Board",
        image: "https://placehold.co/600x400",
        author: "Javier Carrillo",
        desc: "hello this is a placeholder",
    },
    {
        id: 2,
        title: "Congrats",
        image: "https://placehold.co/600x400",
        author: "Roy Carrillo",
        desc: "hello this is a placeholder",
    },
];

const BoardDisplay = () => {
    return (
        <div className="board-container">
            {list.length ? (
                list.map((board) => <Board board={board} />)
            ) : (
                <WelcomeBoard />
            )}
        </div>
    );
};

export default BoardDisplay;
