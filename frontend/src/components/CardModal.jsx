import "../styles/CardModal.css";
import DisplayCard from "./DisplayCard";

const CardModal = ({selectedCard, setShowComments}) => {
    return (
        <div className="modal-overlay" onClick={() => {
            setShowComments(false)
        }}>
            <div className="card-modal-content">
                <div>
                    <DisplayCard
                    card={selectedCard}
                />
                </div>
            </div>
        </div>
    );
};

export default CardModal;
