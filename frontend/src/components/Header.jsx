import "../styles/Header.css"
import Search from "./Search";
import Filters from "./Filters";
import CreateButton from "./CreateButton";

const Header = () => {
    return (
        <header>
            <h1>Kudos Board!</h1>
            <Search/>
            <Filters/>
            <CreateButton/>
        </header>
    )
}

export default Header;