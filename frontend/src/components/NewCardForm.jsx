import { X } from "lucide-react";
import "../styles/NewCardForm.css";
import GIFSelector from "./GIFSelector";

const NewCardForm = ({ setShowCardModal, createCard }) => {
    const [cardFormData, setCardFormData] = useState({
        message: "",
        gifUrl: "",
        author: "",
        color: "yellow",
    });
    const [gifResults, setGifResults] = useState([]);
    const [gifSearch, setGifSearch] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCardFormData({
            ...cardFormData,
            [name]: value,
        });
    };

    const handleCardAddSubmit = async (e) => {
        e.preventDefault();

        if (!cardFormData.gifUrl) {
            return;
        }

        await createCard(cardFormData);
        setCardFormData({
            message: "",
            gifUrl: "",
            author: "",
            color: "yellow",
        });
        setGifResults([]);
        setGifSearch("");
        setShowCardModal(false);
    };

    return (
        <div className="modal-container">
            <X
                onClick={() => {
                    setShowCardModal(false);
                }}
                size={30}
                className="close-button"
            />
            <div className="form-container">
                <h2>Create a new Card:</h2>
                <form className="add-form" onSubmit={handleCardAddSubmit}>
                    <div className="form-group">
                        <label>Message*</label>
                        <input
                            type="text"
                            id="message"
                            name="message"
                            value={cardFormData.message}
                            onChange={handleInputChange}
                            required
                        ></input>
                    </div>

                    <div className="form-group">
                        <label>Author</label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={cardFormData.author}
                            onChange={handleInputChange}
                        ></input>
                    </div>

                    <div className="form-group">
                        <label>GIF*</label>
                        <GIFSelector
                            gifSearch={gifSearch}
                            setGifSearch={setGifSearch}
                            gifResults={gifResults}
                            cardFormData={cardFormData}
                            setCardFormData={setCardFormData}
                            setGifResults={setGifResults}
                        />
                        <input
                            type="hidden"
                            id="gif"
                            name="gifUrl"
                            required
                            value={cardFormData.message}
                        ></input>
                    </div>

                    <div className="form-group">
                        <label>Color*</label>
                        <select
                            id="color"
                            name="color"
                            required
                            value={cardFormData.color}
                            onChange={handleInputChange}
                        >
                            <option value="yellow">Yellow</option>
                            <option value="green">Green</option>
                            <option value="pink">Pink</option>
                            <option value="blue">Blue</option>
                        </select>
                    </div>

                    <p>(*) indicates required fields</p>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default NewCardForm;
