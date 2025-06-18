import "../styles/HomeHeader.css";
import Search from "./Search";
import Filters from "./Filters";
import CreateButton from "./CreateButton";
import Title from "./Title";

const HomeHeader = ({ setShowModal, searchField, setSearchField, handleSearchSubmit}) => {
    return (
        <header>
            <Title />
            <Search searchField={searchField} setSearchField={setSearchField} handleSearchSubmit={handleSearchSubmit}/>
            <Filters />
            <CreateButton setShowModal={setShowModal} />
        </header>
    );
};

export default HomeHeader;
