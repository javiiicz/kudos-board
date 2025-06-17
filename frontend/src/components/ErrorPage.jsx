import BoardDisplay from "./BoardDisplay";
import HomeHeader from "./HomeHeader.jsx";
import "../styles/ErrorPage.css"

const ErrorPage = () => {
    return (
        <>
            <HomeHeader />
            <main className="error-main">
                <h2>404: Page not found...</h2>
            </main>
        </>
    );
};

export default ErrorPage;
