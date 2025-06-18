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
        next({message: "The board with the specified ID does not exist", status: 404})
    } else {
        res.json(board);
    }
})


// [GET] cards for a specific board
server.get("/boards/:boardID/cards", async(req,res,next) => {
    let id = req.params.boardID

    // make sure id is Integer
    if (isNaN(id)) {
        next({message: "ID of the board has to be an integer", status: 400})
        return
    }

    let cards = await prisma.card.findMany({where: {boardId: parseInt(id)}});

    res.json(cards);
})


// [POST] new board
server.post("/boards", async (req, res, next) => {
    let body = req.body;

    if (body === undefined) {
        next({message: "The request has no body", status: 400})
        return
    }

    let {title, imageUrl, category, author} = body


    if (title === undefined ||  imageUrl === undefined || category === undefined) {
        next({message: "The new board is missing information", status: 400})
        return
    }

    const added = await prisma.board.create({
        data: {
            title,
            imageUrl,
            category,
            author
        }
    })

    res.json(added);
})


// [POST] new card
// [TODO] change url to /boards/:boardID/cards
server.post("/cards", async (req, res, next) => {
    let body = req.body;

    let {title, description, gifUrl, author, boardId} = body


    if (title === undefined ||  description === undefined || gifUrl === undefined || isNaN(boardId)) {
        next({message: "The new card is missing information", status: 400})
        return
    }

    boardId = parseInt(boardId)

    // Check that the board exists
    const exists = (await prisma.board.findUnique({where: {id: boardId}})) !== null
    if (!exists) {
        next({message: "The board where you are posting this card does not exist", status: 400})
        return
    }

    const added = await prisma.card.create({
        data: {
            title,
            description,
            gifUrl,
            author,
            boardId
        }
    })

    res.json(added);
})


// [DELETE] a card
server.delete("/cards/:id", async (req, res, next) => {
    let id = req.params.id

    // make sure id is Integer
    if (isNaN(id)) {
        next({message: "ID of the card has to be an integer", status: 400})
        return
    }

    id = parseInt(id)

    // check if card exists
    const exists = (await prisma.card.findUnique({where: {id: id}})) !== null
    if (!exists) {
        next({message: "The card you are deleting does not exist", status: 404})
        return
    }

    const deleted = await prisma.card.delete({
        where: {id: id}
    })

    res.json(deleted)
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
