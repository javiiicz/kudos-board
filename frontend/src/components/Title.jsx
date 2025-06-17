import { useNavigate } from "react-router-dom";
import "../styles/Title.css"

const Title = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    }

    return (
        <button onClick={handleClick} className="title-button">
            <h1>Kudomate</h1>
        </button>
    );
};

export default Title;
