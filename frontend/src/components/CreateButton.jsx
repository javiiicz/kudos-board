import "../styles/CreateButton.css"

const CreateButton = ({setShowModal}) => {
    return (
        <button className="create-button" onClick={() => {setShowModal(true)}}>
            <p>+ Create a New Board</p>
        </button>
    )
}

export default CreateButton;