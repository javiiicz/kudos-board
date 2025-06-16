import "../styles/Search.css";

const Search = () => {
    return (
        <form className="search-container">
            <input type="text" className="search-input"></input>
            <div className="buttons">
                <button>Submit</button>
                <button>Clear</button>
            </div>
        </form>
    );
};

export default Search;
