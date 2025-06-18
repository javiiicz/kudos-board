import "../styles/HomeHeader.css";
import Search from "./Search";
import Filters from "./Filters";
import CreateButton from "./CreateButton";
import Title from "./Title";

const HomeHeader = ({
    setShowModal,
    searchField,
    setSearchField,
    handleSearchSubmit,
    clearSearch
}) => {
    return (
        <header>
            <Title />
            <Search
                searchField={searchField}
                setSearchField={setSearchField}
                handleSearchSubmit={handleSearchSubmit}
                clearSearch={clearSearch}
            />
            <Filters />
            <CreateButton setShowModal={setShowModal} />
        </header>
    );
};

export default HomeHeader;
