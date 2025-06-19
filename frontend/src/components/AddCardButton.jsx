import "../styles/AddCardButton.css"

const CreateButton = ({setShowCardModal}) => {
    return (
        <button className="add-button" onClick={() => {setShowCardModal(true)}}>
            <p>+ Add a new Card</p>
        </button>
    )
}

export default CreateButton;