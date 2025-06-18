import "../styles/Filters.css";

const Filters = ({ filter, setFilter }) => {
    return (
        <div className="filter-container">
            <button
                className={"filter" + (filter === "all" ? " active-filter" : "")}
                onClick={() => {
                    setFilter("all");
                }}
            >
                <p>All</p>
            </button>
            <button
                className={"filter" + (filter === "recent" ? " active-filter" : "")}
                onClick={() => {
                    setFilter("recent");
                }}
            >
                <p>Recent</p>
            </button>
            <button
                className={"filter" + (filter === "celebration" ? " active-filter" : "")}
                onClick={() => {
                    setFilter("celebration");
                }}
            >
                <p>Celebration</p>
            </button>
            <button
                className={"filter" + (filter === "ty" ? " active-filter" : "")}
                onClick={() => {
                    setFilter("ty");
                }}
            >
                <p>Thank You</p>
            </button>
            <button
                className={"filter" + (filter === "inspiration" ? " active-filter" : "")}
                onClick={() => {
                    setFilter("inspiration");
                }}
            >
                <p>Inspiration</p>
            </button>
        </div>
    );
};

export default Filters;
