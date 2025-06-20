import { useEffect, useState } from "react";
import "../styles/App.css";
import Footer from "./Footer";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./HomePage.jsx";
import BoardPage from "./BoardPage.jsx";
import ErrorPage from "./ErrorPage.jsx";

function App() {
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleError = (err) => {
        setError(err);
        navigate("/error");
    };

    useEffect(() => {
        if (isDarkMode) {
            document.querySelector('#root').classList.add("dark-mode")
        } else {
            document.querySelector('#root').classList.remove("dark-mode")
        }
    }, [isDarkMode])

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <HomePage
                            handleError={handleError}
                        />
                    }
                />
                <Route
                    path="/boards/:id"
                    element={
                        <BoardPage
                            handleError={handleError}
                        />
                    }
                />
                <Route
                    path="/*"
                    element={
                        <ErrorPage
                            error={error}
                        />
                    }
                />
            </Routes>
            <Footer isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
        </>
    );
}

export default App;
