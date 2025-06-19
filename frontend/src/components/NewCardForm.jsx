import { X } from "lucide-react";
import "../styles/NewCardForm.css";
import GIFSelector from "./GIFSelector";

const NewCardForm = ({
    setShowCardModal,
    fetchGIFS,
    gifSearch,
    setGifSearch,
    gifResults
}) => {
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
                <form
                    className="add-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <div className="form-group">
                        <label>Message*</label>
                        <input
                            type="text"
                            id="message"
                            name="message"
                            required
                        ></input>
                    </div>

                    <div className="form-group">
                        <label>Author</label>
                        <input type="text" id="author" name="author"></input>
                    </div>

                    <div className="form-group">
                        <label>GIF*</label>
                        <GIFSelector
                            fetchGIFS={fetchGIFS}
                            gifSearch={gifSearch}
                            setGifSearch={setGifSearch}
                            gifResults={gifResults}
                        />
                        <input
                            type="hidden"
                            id="gif"
                            name="gifUrl"
                            required
                        ></input>
                    </div>

                    <div className="form-group">
                        <label>Color*</label>
                        <select id="category" name="category" required>
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
