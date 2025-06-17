import "../styles/BoardPage.css";
import { useParams } from "react-router-dom";
import BoardDetails from "./BoardDetails";
import HomeHeader from "./HomeHeader";

const BoardPage = () => {
    const { id } = useParams();

    return (
        <>
            <HomeHeader />
            <main className="home-main">
                <BoardDetails id={id} />
            </main>
        </>
    );
};

export default BoardPage;
