import BoardDisplay from "./BoardDisplay";
import HomeHeader from "./HomeHeader.jsx";
import "../styles/HomePage.css"
import { useState } from "react";

const HomePage = ({boards, handleAddSubmit, showModal, setShowModal}) => {

    return (
        <>
            <HomeHeader setShowModal={setShowModal}/>
            <main className="home-main">
                <BoardDisplay boards={boards} showModal={showModal} setShowModal={setShowModal} handleAddSubmit={handleAddSubmit}/>
            </main>
        </>
    );
};

export default HomePage;
