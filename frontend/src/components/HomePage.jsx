import BoardDisplay from "./BoardDisplay";
import HomeHeader from "./HomeHeader.jsx";
import "../styles/HomePage.css";
import { useEffect, useState } from "react";
import { fetchRequest } from "../utils/utils.js";

const HomePage = ({ handleError }) => {
    const [boards, setBoards] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [filter, setFilter] = useState("all");

    const backend_url = import.meta.env.VITE_BACKEND_URL;

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

    const deleteBoard = async (boardID) => {
        try {
            await fetchRequest(`${backend_url}/boards/${boardID}`, "DELETE");
            fetchBoards();
        } catch (error) {
            console.error("Fetch error:", error);
            handleError(error);
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
            handleError(error);
        }
        fetchBoards();
    };

    useEffect(() => {
        fetchBoards(null, filter);
    }, [filter]);

    useEffect(() => {
        fetchBoards();
    }, []);

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
