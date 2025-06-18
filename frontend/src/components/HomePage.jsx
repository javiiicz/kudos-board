import BoardDisplay from "./BoardDisplay";
import HomeHeader from "./HomeHeader.jsx";
import "../styles/HomePage.css"
import { useState } from "react";

const HomePage = ({boards}) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <HomeHeader setShowModal={setShowModal}/>
            <main className="home-main">
                <BoardDisplay boards={boards} showModal={showModal} setShowModal={setShowModal}/>
            </main>
        </>
    );
};

export default HomePage;
