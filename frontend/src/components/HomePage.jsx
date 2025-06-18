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
    deleteBoard,
    searchField,
    setSearchField,
    handleSearchSubmit,
    clearSearch,
    filter,
    setFilter,
}) => {
    return (
        <>
            <HomeHeader
                setShowModal={setShowModal}
                searchField={searchField}
                setSearchField={setSearchField}
                handleSearchSubmit={handleSearchSubmit}
                clearSearch={clearSearch}
                filter={filter}
                setFilter={setFilter}
            />
            <main className="home-main">
                <BoardDisplay
                    boards={boards}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    handleAddSubmit={handleAddSubmit}
                    addFormData={addFormData}
                    setAddFormData={setAddFormData}
                    deleteBoard={deleteBoard}
                />
            </main>
        </>
    );
};

export default HomePage;
