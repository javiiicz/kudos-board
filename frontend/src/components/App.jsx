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
    const [error, setError] = useState(null);
    const [currentBoard, setCurrentBoard] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [addFormData, setAddFormData] = useState({
        title: "",
        author: "",
        image: "",
        category: "",
    });

    const fetchRequest = async (url, method) => {
        try {
            const response = await fetch(url, { method: method });
            if (!response.ok) {
                if (response.status === 400) {
                    throw new Error(
                        "400: The server could not understand the request."
                    );
                }
                if (response.status === 404) {
                    throw new Error("404: Not Found.");
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
            fetchedBoards = await fetchRequest(
                "http://localhost:3000/boards",
                "GET"
            );
        } catch (e) {
            console.log("No boards found...", e);
        }
        setBoards(fetchedBoards);
    };

    const fetchCardsForBoard = async (boardID) => {
        let fetchedCards = [];
        try {
            fetchedCards = await fetchRequest(
                `http://localhost:3000/cards/${boardID}`,
                "GET"
            );
        } catch (e) {
            console.error("Error while fetching cards for a board", e);
        }
        setCards(fetchedCards);
    };

    const fetchBoardByID = async (boardID) => {
        let fetchedBoard = null;
        try {
            fetchedBoard = await fetchRequest(
                `http://localhost:3000/boards/${boardID}`,
                "GET"
            );
        } catch (e) {
            if (e.message.includes("400") || e.message.includes("404")) {
                setError(e);
                navigate("/error");
            } else {
                console.error("Error while fetching board:", e);
            }
        }
        setCurrentBoard(fetchedBoard);
    };

    const deleteCard = async (cardID) => {
        try {
            await fetchRequest(
                `http://localhost:3000/cards/${cardID}`,
                "DELETE"
            );
            fetchCardsForBoard(data.boardId);
        } catch (error) {
            console.error("Fetch error:", error);
            throw error;
        }
    };

    const createBoard = async (board) => {
        fetchBoards();
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();

        let board = {};

        setShowModal(false);
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
                            handleAddSubmit={handleAddSubmit}
                            showModal={showModal}
                            setShowModal={setShowModal}
                            addFormData={addFormData}
                            setAddFormData={setAddFormData}
                        />
                    }
                />
                <Route
                    path="/boards/:id"
                    element={
                        <BoardPage
                            cards={cards}
                            fetchCardsForBoard={fetchCardsForBoard}
                            currentBoard={currentBoard}
                            fetchBoardByID={fetchBoardByID}
                            deleteCard={deleteCard}
                        />
                    }
                />
                <Route path="/*" element={<ErrorPage error={error} />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
