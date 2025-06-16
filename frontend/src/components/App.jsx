import { useState } from "react";
import "../styles/App.css";
import Footer from "./Footer";
import BoardDisplay from "./BoardDisplay";
import Header from "./Header.jsx";
import { Route, Routes } from "react-router-dom";

function App() {
    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<BoardDisplay />}/>
                </Routes>
            </main>
            <Footer />
        </>
    );
}

export default App;
