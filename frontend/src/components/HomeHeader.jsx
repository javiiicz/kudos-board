import "../styles/HomeHeader.css";
import Search from "./Search";
import Filters from "./Filters";
import CreateButton from "./CreateButton";
import Title from "./Title";

const HomeHeader = ({
    setShowModal,
    filter,
    setFilter,
    fetchBoards,
}) => {
    return (
        <header>
            <Title />
            <Search fetchBoards={fetchBoards} filter={filter}/>
            <Filters filter={filter} setFilter={setFilter} />
            <CreateButton setShowModal={setShowModal} />
        </header>
    );
};

export default HomeHeader;
