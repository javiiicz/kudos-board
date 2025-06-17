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


// [GET] board by id
server.get("/boards/:id", async (req, res, next) => {
    
    let id = req.params.id

    // make sure id is Integer
    if (isNaN(id)) {
        next({message: "ID of the board has to be an integer", status: 400})
        return
    }

    let board = await prisma.board.findUnique({where: {id: parseInt(id)}});

    if (!board) {
        next({message: "The pet with the specified ID does not exist", status: 404})
    } else {
        res.json(board);
    }
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
