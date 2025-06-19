import "../styles/HomeHeader.css";
import Title from "./Title";
import AddCardButton from "./AddCardButton"

const BoardHeader = ({setShowCardModal}) => {
    return (
        <header>
            <Title/>
            <AddCardButton setShowCardModal={setShowCardModal}/>
        </header>
    );
};

export default BoardHeader;
