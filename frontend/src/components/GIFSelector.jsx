import "../styles/GIFSelector.css";
import { callGiphyApi } from "../utils/utils";

const GIFSelector = ({
    gifSearch,
    setGifSearch,
    gifResults,
    cardFormData,
    setCardFormData,
    setGifResults
}) => {
    const handleGIFSubmit = (e) => {
        e.preventDefault();
        fetchGIFS();
    };

    const handleFieldChange = (e) => {
        setGifSearch(e.target.value);
    };

    const fetchGIFS = async () => {
        let gifs = await callGiphyApi(gifSearch);
        setGifResults(gifs);
    };

    const selectGif = (gif) => {
        setCardFormData({
            ...cardFormData,
            gifUrl: gif.images.original.url,
        });
        setGifResults([gif])
    };

    return (
        <div className="gif-selector-container">
            <input
                type="text"
                value={gifSearch}
                onChange={handleFieldChange}
            ></input>
            <button onClick={handleGIFSubmit}>Search GIPHY</button>
            <div className="gif-result-container">
                {gifResults.length !== 0 &&
                    gifResults.map((gif) => (
                        <img
                            key={gif.id}
                            src={gif.images.original.url}
                            alt={gif.title}
                            className="gif-result"
                            onClick={() => {selectGif(gif)}}
                        ></img>
                    ))}
            </div>
        </div>
    );
};

export default GIFSelector;
