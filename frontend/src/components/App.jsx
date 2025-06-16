import { useState } from "react";
import "../styles/App.css";
import Footer from "./Footer";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage.jsx";

function App() {
    return (
        <>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
        </Routes>
            <Footer />
        </>
    );
}

export default App;
