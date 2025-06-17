import { useEffect, useState } from "react";
import "../styles/App.css";
import Footer from "./Footer";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage.jsx";
import BoardPage from "./BoardPage.jsx";

function App() {
    const [boards, setBoards] = useState([]);

    const fetchGET = async (url) => {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Response is not ok");
        }
        const body = await response.json();
        return body;
    };

    const fetchBoards = async () => {
        let fetchedBoards = []
        try {
            fetchedBoards = await fetchGET("http://localhost:3000/boards");
        } catch (e) {
            console.log('No boards found...')
        } 
        setBoards(fetchedBoards);
    };

    useEffect(() => {
        fetchBoards();
    }, []);

    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage boards={boards} />} />
                <Route path="/boards/:id" element={<BoardPage />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
