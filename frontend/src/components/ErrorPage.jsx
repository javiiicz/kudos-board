import ErrorHeader from "./ErrorHeader.jsx";
import "../styles/ErrorPage.css"

const ErrorPage = ({error}) => {
    return (
        <>
            <ErrorHeader />
            <main className="error-main">
                <h2>Oops, something went wrong</h2>
                <p>{error ? error.message : "The page does not exist"}</p>
            </main>
        </>
    );
};

export default ErrorPage;
