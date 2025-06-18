import "../styles/Search.css";

const Search = ({ searchField, setSearchField, handleSearchSubmit, clearSearch }) => {
    const handleInputChange = (e) => {
        setSearchField(e.target.value);
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
                <button
                    onClick={clearSearch}
                >
                    Clear
                </button>
            </div>
        </form>
    );
};

export default Search;
