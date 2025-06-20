export const fetchRequest = async (url, method, body = null) => {
        try {
            const request = new Request(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: body,
            });
            const response = await fetch(request);
            if (!response.ok) {
                if (response.status === 400) {
                    throw new Error(
                        "400: The server could not understand the request."
                    );
                }
                if (response.status === 404) {
                    throw new Error("404: Not Found.");
                }
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Fetch error:", error);
            throw error;
        }
    };

export const callGiphyApi = async (search) => {
        try {
            const apiKey = import.meta.env.VITE_GIPHY_API_KEY;
            const request = new Request(
                `http://api.giphy.com/v1/gifs/search?limit=6&api_key=${apiKey}&q=${search.replace(
                    " ",
                    "%20"
                )}`
            );
            const response = await fetch(request);
            if (!response.ok) {
                if (response.status === 400) {
                    throw new Error(
                        "400: The server could not understand the request."
                    );
                }
                if (response.status === 404) {
                    throw new Error("404: Not Found.");
                }
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            let gifs = data.data;
            return gifs;
        } catch (error) {
            console.error("Fetch error:", error);
            throw error;
        }
    };