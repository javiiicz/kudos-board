import HomeHeader from "./HomeHeader.jsx";
import "../styles/ErrorPage.css"

const ErrorPage = ({error}) => {
    return (
        <>
            <HomeHeader />
            <main className="error-main">
                <h2>Oops, something went wrong</h2>
                <p>{error ? error.message : "The page does not exist"}</p>
            </main>
        </>
    );
};

export default ErrorPage;
