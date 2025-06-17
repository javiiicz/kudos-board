import "../styles/HomeHeader.css";
import Search from "./Search";
import Filters from "./Filters";
import CreateButton from "./CreateButton";
import Title from "./Title";

const HomeHeader = () => {
    return (
        <header>
            <Title/>
            <Search />
            <Filters />
            <CreateButton />
        </header>
    );
};

export default HomeHeader;
