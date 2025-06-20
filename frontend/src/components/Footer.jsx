import { Moon, Sun } from "lucide-react";
import "../styles/Footer.css"

const Footer = ({isDarkMode, setIsDarkMode}) => {
    return (
        <footer>
            <div className="mode-toggle" onClick={() => {setIsDarkMode(!isDarkMode)}}>
                {isDarkMode ? <Moon/> : <Sun/>}
            </div>
            <p className="footer-text">Made by Javier Carrillo</p>
        </footer>
    )
}

export default Footer;