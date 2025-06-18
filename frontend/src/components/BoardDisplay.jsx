import "../styles/BoardDisplay.css";
import Board from "./Board";
import NewBoardSection from "./NewBoardSection";

const BoardDisplay = ({
    boards,
    showModal,
    setShowModal,
    handleAddSubmit,
    addFormData,
    setAddFormData,
    deleteBoard,
}) => {
    if (showModal) {
        return (
            <NewBoardSection
                setShowModal={setShowModal}
                handleAddSubmit={handleAddSubmit}
                addFormData={addFormData}
                setAddFormData={setAddFormData}
            />
        );
    }

    return (
        <div className="board-container">
            {boards.length ? (
                boards.map((board) => (
                    <Board
                        key={board.id}
                        board={board}
                        deleteBoard={deleteBoard}
                    />
                ))
            ) : (
                <div> 
                    <h2>No board found...</h2>
                </div>
            )}
        </div>
    );
};

export default BoardDisplay;
