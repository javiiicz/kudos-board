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
        imageUrl: "",
        category: "",
        author: "",
    });
    const [searchField, setSearchField] = useState("");
    const [filter, setFilter] = useState("all");
    const [showCardModal, setShowCardModal] = useState(false);
    const [cardFormData, setCardFormData] = useState({
        message: "",
        gifUrl: "",
        author: "",
        color: "yellow",
    });
    const [gifSearch, setGifSearch] = useState("");
    const [gifResults, setGifResults] = useState([]);

    const fetchRequest = async (url, method, body = null) => {
        try {
            const request = new Request(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: body,
            });
            const response = await fetch(request);
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

    const fetchBoards = async (search = null, filter = null) => {
        let fetchedBoards = [];
        let url = `http://localhost:3000/boards`;

        if (search && filter) {
            url = `http://localhost:3000/boards?search=${search}&filter=${filter}`;
        } else if (search || filter) {
            url =
                `http://localhost:3000/boards?` +
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
                `http://localhost:3000/boards/${boardID}/cards`,
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
                `http://localhost:3000/boards/${boardID}`,
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
                `http://localhost:3000/boards/${boardID}`,
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
                `http://localhost:3000/cards/${cardID}`,
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
                "http://localhost:3000/boards",
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

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        await createBoard(addFormData);
        setAddFormData({
            title: "",
            imageUrl: "",
            category: "",
            author: "",
        });
        setShowModal(false);
    };

    const toggleCardUpvote = async (cardID) => {
        try {
            let data = await fetchRequest(
                `http://localhost:3000/cards/${cardID}`,
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

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchBoards(searchField);
        setSearchField("");
    };

    const clearSearch = () => {
        fetchBoards();
        setSearchField("");
    };

    const parseGifs = (data) => {
        let gifs = data.data;
        return gifs;
    };

    const callGiphyApi = async () => {
        try {
            const apiKey = import.meta.env.VITE_GIPHY_API_KEY;
            const request = new Request(
                `http://api.giphy.com/v1/gifs/search?limit=6&api_key=${apiKey}&q=${gifSearch.replace(
                    " ",
                    "%20"
                )}`
            );
            const response = await fetch(request);
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
            let gifs = parseGifs(data);
            return gifs;
        } catch (error) {
            console.error("Fetch error:", error);
            throw error;
        }
    };

    const fetchGIFS = async () => {
        let gifs = await callGiphyApi();
        setGifResults(gifs);
    };

    const handleCardAddSubmit = async (e) => {
        e.preventDefault();

        if (!cardFormData.gifUrl) {
            return
        }

        await createCard(cardFormData);
        setCardFormData({
            message: "",
            gifUrl: "",
            author: "",
            color: "yellow",
        });
        setShowCardModal(false);
    };

    const createCard = async (card) => {
        try {
            await fetchRequest(
                `http://localhost:3000/boards/${currentBoard.id}/cards`,
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
                            handleAddSubmit={handleAddSubmit}
                            showModal={showModal}
                            setShowModal={setShowModal}
                            addFormData={addFormData}
                            setAddFormData={setAddFormData}
                            deleteBoard={deleteBoard}
                            searchField={searchField}
                            setSearchField={setSearchField}
                            handleSearchSubmit={handleSearchSubmit}
                            clearSearch={clearSearch}
                            filter={filter}
                            setFilter={setFilter}
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
                            showCardModal={showCardModal}
                            setShowCardModal={setShowCardModal}
                            cardFormData={cardFormData}
                            setCardFormData={setCardFormData}
                            fetchGIFS={fetchGIFS}
                            gifSearch={gifSearch}
                            setGifSearch={setGifSearch}
                            gifResults={gifResults}
                            setGifResults={setGifResults}
                            handleCardAddSubmit={handleCardAddSubmit}
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
