import { useEffect, useState } from "react";
import "../styles/App.css";
import Footer from "./Footer";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./HomePage.jsx";
import BoardPage from "./BoardPage.jsx";

function App() {
    const navigate = useNavigate();

    const [boards, setBoards] = useState([]);
    const [cards, setCards] = useState([]);

    const fetchGET = async (url) => {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Response is not ok");
        }
        const body = await response.json();
        return body;
    };

    const fetchBoards = async () => {
        let fetchedBoards = [];
        try {
            fetchedBoards = await fetchGET("http://localhost:3000/boards");
        } catch (e) {
            console.log("No boards found...");
        }
        setBoards(fetchedBoards);
    };

    const fetchCardsForBoard = async (boardID) => {
        let fetchedCards = [];
        try {
            fetchedCards = await fetchGET(
                `http://localhost:3000/cards/${boardID}`
            );
        } catch (e) {
            console.error("Error while fetching cards for a board");
        }
        setCards(fetchedCards);
    };

    const handleBoardClick = (id) => {
        navigate(`/boards/${id}`);
    };

    useEffect(() => {
        fetchBoards();
    }, []);

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <HomePage
                            boards={boards}
                            handleBoardClick={handleBoardClick}
                        />
                    }
                />
                <Route
                    path="/boards/:id"
                    element={<BoardPage cards={cards} fetchCardsForBoard={fetchCardsForBoard}/>}
                />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
