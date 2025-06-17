import Card from "./Card";
import "../styles/BoardDetails.css"

const BoardDetails = ({id}) => {
    return (
        <>
            <h2>ID = {id}</h2>
            <div className="card-container">
                <Card/>
            </div>
        </>
    )
}

export default BoardDetails;