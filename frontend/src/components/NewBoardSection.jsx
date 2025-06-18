import {X} from 'lucide-react'
import "../styles/NewBoardSection.css"

const NewBoardSection = ({setShowModal}) => {
    return (
        <div className="modal-container">
                <X
                    onClick={() => {
                        setShowModal(false);
                    }}
                    size={30}
                    className="close-button"
                />
                <div className="form-container">
                    <h2>Create a new Board:</h2>
                    <form className="add-form">
                        <label for="title">Title*</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                        ></input>

                        <label for="author">Author</label>
                        <input type="text" id="author" name="author"></input>

                        <label for="image">Image URL*</label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            required
                        ></input>

                        <label for="category">Category*</label>
                        <select id="category" name="category" required>
                            <option value="">Select a category</option>
                            <option value="Celebration">Celebration</option>
                            <option value="Inspiration">Inspiration</option>
                            <option value="Thank You">Thank You</option>
                        </select>

                        <p>(*) indicates required fields</p>

                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
    )
}

export default NewBoardSection;