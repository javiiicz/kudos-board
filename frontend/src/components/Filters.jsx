import "../styles/Filters.css"

const Filters = () => {
    return (
        <div className="filter-container">
            <button className="filter"><p>All</p></button>
            <button className="filter"><p>Recent</p></button>
            <button className="filter"><p>Celebration</p></button>
            <button className="filter"><p>Thank You</p></button>
            <button className="filter"><p>Inspiration</p></button>
        </div>
    )
}

export default Filters;