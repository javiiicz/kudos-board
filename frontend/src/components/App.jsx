import { useEffect, useState } from "react";
import "../styles/App.css";
import Footer from "./Footer";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./HomePage.jsx";
import BoardPage from "./BoardPage.jsx";
import ErrorPage from "./ErrorPage.jsx";

function App() {
    const navigate = useNavigate();

    const [boards, setBoards] = useState([]);
    const [cards, setCards] = useState([]);
    const [currentBoard, setCurrentBoard] = useState(null);

    const fetchGET = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                if (response.status === 400) {
                    throw new Error(
                        "400: The server could not understand the request."
                    );
                }
                if (response.status === 404) {
                    throw new Error(
                        "404: Not Found."
                    );
                }
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Fetch error:", error);
            throw error;
        }
    };

    const fetchBoards = async () => {
        let fetchedBoards = [];
        try {
            fetchedBoards = await fetchGET("http://localhost:3000/boards");
        } catch (e) {
            console.log("No boards found...", e);
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
            console.error("Error while fetching cards for a board", e);
        }
        setCards(fetchedCards);
    };

    const fetchBoardByID = async (boardID) => {
        let fetchedBoard = null;
        try {
            fetchedBoard = await fetchGET(
                `http://localhost:3000/boards/${boardID}`
            );
        } catch (e) {
            if (e.message.includes("400") || e.message.includes("404")) {
                navigate("/404")
            } else {
                console.error("Error while fetching board:", e);
            }
        }
        setCurrentBoard(fetchedBoard);
    };

    useEffect(() => {
        fetchBoards();
    }, []);

    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage boards={boards} />} />
                <Route
                    path="/boards/:id"
                    element={
                        <BoardPage
                            cards={cards}
                            fetchCardsForBoard={fetchCardsForBoard}
                            currentBoard={currentBoard}
                            fetchBoardByID={fetchBoardByID}
                        />
                    }
                />
                <Route path="/*" element={<ErrorPage/>}/>
            </Routes>
            <Footer />
        </>
    );
}

export default App;
