import "../styles/GIFSelector.css";

const GIFSelector = () => {
    const handleGIFSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="gif-selector-container">
            <input type="text"></input>
            <button onClick={handleGIFSubmit}>Search GIPHY</button>
        </div>
    );
};

export default GIFSelector;
