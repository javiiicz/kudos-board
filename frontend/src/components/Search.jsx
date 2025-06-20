import "../styles/Search.css";
import { useState } from "react";

const Search = ({ fetchBoards, filter }) => {
    const [searchField, setSearchField] = useState("");

    const handleInputChange = (e) => {
        setSearchField(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchBoards(searchField, filter);
        setSearchField("");
    };

    const clearSearch = () => {
        fetchBoards();
        setSearchField("");
    };

    return (
        <form className="search-container" onSubmit={handleSearchSubmit}>
            <input
                type="text"
                className="search-input"
                value={searchField}
                onChange={handleInputChange}
            ></input>
            <div className="buttons">
                <button type="submit">Submit</button>
                <button onClick={clearSearch}>Clear</button>
            </div>
        </form>
    );
};

export default Search;
