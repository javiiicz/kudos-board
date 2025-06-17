const express = require("express");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.send("Hello from Express!");
});

// [CATCH-ALL]
server.use((req, res, next) => {
    next({ status: 404, message: "Not found" });
});

// Error handling
server.use((err, req, res, next) => {
    const { message, status = 500 } = err;
    console.error(message);
    res.status(status).json({ message }); // Unsafe in prod
});

module.exports = server;
