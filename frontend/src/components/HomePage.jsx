import BoardDisplay from "./BoardDisplay";
import HomeHeader from "./HomeHeader.jsx";
import "../styles/HomePage.css"

const HomePage = ({boards}) => {
    return (
        <>
            <HomeHeader />
            <main className="home-main">
                <BoardDisplay boards={boards}/>
            </main>
        </>
    );
};

export default HomePage;
