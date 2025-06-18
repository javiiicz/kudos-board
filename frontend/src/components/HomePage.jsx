import BoardDisplay from "./BoardDisplay";
import HomeHeader from "./HomeHeader.jsx";
import "../styles/HomePage.css";
import { useState } from "react";

const HomePage = ({
    boards,
    handleAddSubmit,
    showModal,
    setShowModal,
    addFormData,
    setAddFormData,
}) => {
    return (
        <>
            <HomeHeader setShowModal={setShowModal} />
            <main className="home-main">
                <BoardDisplay
                    boards={boards}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    handleAddSubmit={handleAddSubmit}
                    addFormData={addFormData}
                    setAddFormData={setAddFormData}
                />
            </main>
        </>
    );
};

export default HomePage;
