import "../styles/BoardDisplay.css";
import Board from "./Board";
import NewBoardSection from "./NewBoardSection";
import WelcomeBoard from "./WelcomeBoard";

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
                <WelcomeBoard />
            )}
        </div>
    );
};

export default BoardDisplay;
