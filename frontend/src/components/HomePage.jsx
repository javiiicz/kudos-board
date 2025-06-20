import BoardDisplay from "./BoardDisplay";
import HomeHeader from "./HomeHeader.jsx";
import "../styles/HomePage.css";
import { useState } from "react";

const HomePage = ({
    boards,
    showModal,
    setShowModal,
    deleteBoard,
    filter,
    setFilter,
    createBoard,
    fetchBoards
}) => {
    return (
        <>
            <HomeHeader
                setShowModal={setShowModal}
                filter={filter}
                setFilter={setFilter}
                fetchBoards={fetchBoards}
            />
            <main className="home-main">
                <BoardDisplay
                    boards={boards}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    deleteBoard={deleteBoard}
                    createBoard={createBoard}
                />
            </main>
        </>
    );
};

export default HomePage;
