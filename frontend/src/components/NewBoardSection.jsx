import { X } from "lucide-react";
import "../styles/NewBoardSection.css";
import { useState } from "react";

const NewBoardSection = ({
    setShowModal,
    createBoard
}) => {
    const [addFormData, setAddFormData] = useState({
            title: "",
            imageUrl: "",
            category: "",
            author: "",
        });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddFormData({
            ...addFormData,
            [name]: value,
        });
    };

    const handleAddSubmit = async (e) => {
            e.preventDefault();
            await createBoard(addFormData);
            setAddFormData({
                title: "",
                imageUrl: "",
                category: "",
                author: "",
            });
            setShowModal(false);
        };

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
                <form className="add-form" onSubmit={handleAddSubmit}>
                    <div className="form-group">
                        <label>Title*</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={addFormData.title}
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
                            value={addFormData.author}
                            onChange={handleInputChange}
                        ></input>
                    </div>

                    <div className="form-group">
                        <label>Image URL*</label>
                        <input
                            type="text"
                            id="image"
                            name="imageUrl"
                            value={addFormData.imageUrl}
                            onChange={handleInputChange}
                            required
                        ></input>
                    </div>

                    <div className="form-group">
                        <label>Category*</label>
                        <select
                            id="category"
                            name="category"
                            value={addFormData.category}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select a category</option>
                            <option value="Celebration">Celebration</option>
                            <option value="Inspiration">Inspiration</option>
                            <option value="Thank You">Thank You</option>
                        </select>
                    </div>

                    <p>(*) indicates required fields</p>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default NewBoardSection;
