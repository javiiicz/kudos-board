import BoardDisplay from "./BoardDisplay";
import HomeHeader from "./HomeHeader.jsx";
import "../styles/HomePage.css"

const HomePage = () => {
    return (
        <>
            <HomeHeader />
            <main className="home-main">
                <BoardDisplay />
            </main>
        </>
    );
};

export default HomePage;
