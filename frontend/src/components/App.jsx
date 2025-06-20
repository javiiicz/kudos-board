import { useEffect, useState } from "react";
import "../styles/App.css";
import Footer from "./Footer";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./HomePage.jsx";
import BoardPage from "./BoardPage.jsx";
import ErrorPage from "./ErrorPage.jsx";
import { fetchRequest } from "../utils/utils.js";

function App() {
    const navigate = useNavigate();

    const [boards, setBoards] = useState([]);
    const [cards, setCards] = useState([]);
    const [error, setError] = useState(null);
    const [currentBoard, setCurrentBoard] = useState(null);
    const [showModal, setShowModal] = useState(false);
    
    const [filter, setFilter] = useState("all");

    const backend_url = import.meta.env.VITE_BACKEND_URL


    const fetchBoards = async (search = null, filter = null) => {
        let fetchedBoards = [];
        let url = `${backend_url}/boards`;

        if (search && filter) {
            url = `${backend_url}/boards?search=${search}&filter=${filter}`;
        } else if (search || filter) {
            url =
                `${backend_url}/boards?` +
                (search ? `search=${search}` : "") +
                (filter ? `filter=${filter}` : "");
        }

        try {
            fetchedBoards = await fetchRequest(url, "GET");
        } catch (e) {
            console.log("No boards found...", e);
        }
        setBoards(fetchedBoards);
    };

    const fetchCardsForBoard = async (boardID) => {
        let fetchedCards = [];
        try {
            fetchedCards = await fetchRequest(
                `${backend_url}/boards/${boardID}/cards`,
                "GET"
            );
        } catch (e) {
            console.error("Error while fetching cards for a board", e);
            setError(e);
            navigate("/error");
        }
        setCards(fetchedCards);
    };

    const fetchBoardByID = async (boardID) => {
        let fetchedBoard = null;
        try {
            fetchedBoard = await fetchRequest(
                `${backend_url}/boards/${boardID}`,
                "GET"
            );
        } catch (e) {
            console.error("Error while fetching board:", e);
            setError(e);
            navigate("/error");
        }
        setCurrentBoard(fetchedBoard);
    };

    const deleteBoard = async (boardID) => {
        try {
            await fetchRequest(
                `${backend_url}/boards/${boardID}`,
                "DELETE"
            );
            fetchBoards();
        } catch (error) {
            console.error("Fetch error:", error);
            setError(error);
            navigate("/error");
            throw error;
        }
    };

    const deleteCard = async (cardID) => {
        try {
            let data = await fetchRequest(
                `${backend_url}/cards/${cardID}`,
                "DELETE"
            );
            fetchCardsForBoard(data.boardId);
        } catch (error) {
            console.error("Fetch error:", error);
            setError(error);
            navigate("/error");
            throw error;
        }
    };

    const createBoard = async (board) => {
        try {
            await fetchRequest(
                `${backend_url}/boards`,
                "POST",
                JSON.stringify(board)
            );
        } catch (error) {
            console.error("Error while fetching board:", error);
            setError(error);
            navigate("/error");
        }
        fetchBoards();
    };

    const toggleCardUpvote = async (cardID) => {
        try {
            let data = await fetchRequest(
                `${backend_url}/cards/${cardID}/like`,
                "PATCH"
            );
            fetchCardsForBoard(data.boardId);
        } catch (error) {
            console.error("Fetch error:", error);
            setError(error);
            navigate("/error");
            throw error;
        }
    };

    const createCard = async (card) => {
        try {
            await fetchRequest(
                `${backend_url}/boards/${currentBoard.id}/cards`,
                "POST",
                JSON.stringify(card)
            );
        } catch (error) {
            console.error("Error while fetching board:", error);
            setError(error);
            navigate("/error");
        }
        fetchCardsForBoard(currentBoard.id)
    };

    const toggleCardPin = async (cardID) => {
        try {
            let data = await fetchRequest(
                `${backend_url}/cards/${cardID}/pin`,
                "PATCH"
            );
            fetchCardsForBoard(data.boardId);
        } catch (error) {
            console.error("Fetch error:", error);
            setError(error);
            navigate("/error");
            throw error;
        }
    }

    useEffect(() => {
        fetchBoards();
    }, []);

    useEffect(() => {
        fetchBoards(null, filter);
    }, [filter]);

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <HomePage
                            boards={boards}
                            showModal={showModal}
                            setShowModal={setShowModal}
                            deleteBoard={deleteBoard}
                            filter={filter}
                            setFilter={setFilter}
                            createBoard={createBoard}
                            fetchBoards={fetchBoards}
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
                            toggleCardUpvote={toggleCardUpvote}
                            toggleCardPin={toggleCardPin}
                            createCard={createCard}
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
