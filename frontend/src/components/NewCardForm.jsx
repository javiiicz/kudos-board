import { X } from "lucide-react";
import "../styles/NewCardForm.css";

const NewCardForm = ({}) => {
    return (
        <div className="modal-container">
            <X onClick={() => {}} size={30} className="close-button" />
            <div className="form-container">
                <h2>Create a new Board:</h2>
                <form className="add-form" onSubmit={() => {}}>
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
                        <input
                            type="text"
                            id="author"
                            name="author"
                        ></input>
                    </div>

                    <div className="form-group">
                        <label>GIF*</label>
                        <input
                            type="text"
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
