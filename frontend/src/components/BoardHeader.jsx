import "../styles/HomeHeader.css";
import Title from "./Title";
import AddCardButton from "./AddCardButton"

const BoardHeader = () => {
    return (
        <header>
            <Title/>
            <AddCardButton />
        </header>
    );
};

export default BoardHeader;
