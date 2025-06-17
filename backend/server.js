const express = require("express");
const cors = require("cors");
const { PrismaClient } = require('./generated/prisma')
const prisma = new PrismaClient()


const server = express();
server.use(cors())
server.use(express.json());

// [GET] all boards
server.get("/boards", async (req, res) => {
    
    let boards = await prisma.board.findMany()

    if (!boards.length) {
        next({message: "No boards were found", status: 404})
        return
    }

    res.json(boards)
})

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
