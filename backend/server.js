const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();

const server = express();
server.use(cors());
server.use(express.json());

// [GET] all boards
server.get("/boards", async (req, res, next) => {
    let queries = req.query;
    let boards = [];

    if (queries.search) {
        boards = await prisma.board.findMany({
            where: { title: { contains: queries.search, mode: "insensitive" } },
        });
    } else {
        boards = await prisma.board.findMany();
    }

    if (queries.filter) {
        switch (queries.filter) {
            case "all":
                break;
            case "recent":
                boards.sort((a, b) => {
                    let dateA = new Date(a.created_at);
                    let dateB = new Date(b.created_at);
                    return dateB - dateA;
                });
                boards = boards.slice(0, 6);
                break;
            case "celebration":
                boards = boards.filter((x) => x.category === "Celebration");
                break;
            case "ty":
                boards = boards.filter((x) => x.category === "Thank You");
                break;
            case "inspiration":
                boards = boards.filter((x) => x.category === "Inspiration");
                break;
        }
    }

    res.json(boards);
});

// [GET] board by id
server.get("/boards/:id", async (req, res, next) => {
    let id = req.params.id;

    // make sure id is Integer
    if (isNaN(id)) {
        next({ message: "ID of the board has to be an integer", status: 400 });
        return;
    }

    let board = await prisma.board.findUnique({ where: { id: parseInt(id) } });

    if (!board) {
        next({
            message: "The board with the specified ID does not exist",
            status: 404,
        });
    } else {
        res.json(board);
    }
});

// [GET] cards for a specific board
server.get("/boards/:boardID/cards", async (req, res, next) => {
    let id = req.params.boardID;

    // make sure id is Integer
    if (isNaN(id)) {
        next({ message: "ID of the board has to be an integer", status: 400 });
        return;
    }

    let cards = await prisma.card.findMany({
        where: { boardId: parseInt(id) },
    });

    cards.sort((a, b) => {
        let res = new Date(a.created_at) - new Date(b.created_at);
        return res;
    });

    res.json(cards);
});

// [GET] comments for a specific card
server.get("/cards/:cardID/comments", async (req, res, next) => {
    let id = req.params.cardID;

    // make sure id is Integer
    if (isNaN(id)) {
        next({ message: "ID of the card has to be an integer", status: 400 });
        return;
    }

    let comments = await prisma.comment.findMany({
        where: { cardId: parseInt(id) },
    });

    comments.sort((a, b) => {
        let res = new Date(a.created_at) - new Date(b.created_at);
        return res;
    });

    res.json(comments);
});

// [POST] new board
server.post("/boards", async (req, res, next) => {
    let body = req.body;

    if (body === undefined) {
        next({ message: "The request has no body", status: 400 });
        return;
    }

    let { title, imageUrl, category, author } = body;

    if (
        title === undefined ||
        imageUrl === undefined ||
        category === undefined
    ) {
        next({ message: "The new board is missing information", status: 400 });
        return;
    }

    const added = await prisma.board.create({
        data: {
            title,
            imageUrl,
            category,
            author,
        },
    });

    res.json(added);
});

// [POST] new card
server.post("/boards/:boardID/cards", async (req, res, next) => {
    let body = req.body;

    let boardId = req.params.boardID;
    let { message, gifUrl, author, color } = body;

    if (message === undefined || gifUrl === undefined || isNaN(boardId)) {
        next({ message: "The new card is missing information", status: 400 });
        return;
    }

    boardId = parseInt(boardId);

    // Check that the board exists
    const exists =
        (await prisma.board.findUnique({ where: { id: boardId } })) !== null;
    if (!exists) {
        next({
            message: "The board where you are posting this card does not exist",
            status: 400,
        });
        return;
    }

    const added = await prisma.card.create({
        data: {
            message,
            gifUrl,
            author,
            boardId,
            color,
        },
    });

    res.json(added);
});

// [POST] new comment
server.post("/cards/:cardID/comments", async (req, res, next) => {
    let body = req.body;

    let cardId = req.params.cardID;
    let { message, author } = body;

    if (message === undefined || isNaN(cardId)) {
        next({
            message: "The new comment is missing information",
            status: 400,
        });
        return;
    }

    cardId = parseInt(cardId);

    // Check that the board exists
    const exists =
        (await prisma.card.findUnique({ where: { id: cardId } })) !== null;
    if (!exists) {
        next({
            message: "The card where you are posting this comment does not exist",
            status: 400,
        });
        return;
    }

    const added = await prisma.comment.create({
        data: {
            message,
            author,
            cardId: cardId,
        },
    });

    res.json(added);
});

// [DELETE] a board
server.delete("/boards/:id", async (req, res, next) => {
    let id = req.params.id;

    // make sure id is Integer
    if (isNaN(id)) {
        next({ message: "ID of the board has to be an integer", status: 400 });
        return;
    }

    id = parseInt(id);

    // check if card exists
    const exists =
        (await prisma.board.findUnique({ where: { id: id } })) !== null;
    if (!exists) {
        next({
            message: "The board you are deleting does not exist",
            status: 404,
        });
        return;
    }

    const deleted = await prisma.board.delete({
        where: { id: id },
    });

    res.json(deleted);
});

// [DELETE] a card
server.delete("/cards/:id", async (req, res, next) => {
    let id = req.params.id;

    // make sure id is Integer
    if (isNaN(id)) {
        next({ message: "ID of the card has to be an integer", status: 400 });
        return;
    }

    id = parseInt(id);

    // check if card exists
    const exists =
        (await prisma.card.findUnique({ where: { id: id } })) !== null;
    if (!exists) {
        next({
            message: "The card you are deleting does not exist",
            status: 404,
        });
        return;
    }

    const deleted = await prisma.card.delete({
        where: { id: id },
    });

    res.json(deleted);
});

// [PATCH] a card to like
server.patch("/cards/:id/like", async (req, res, next) => {
    let id = req.params.id;

    // make sure id is Integer
    if (isNaN(id)) {
        next({ message: "ID of the card has to be an integer", status: 400 });
        return;
    }

    id = parseInt(id);

    let card = await prisma.card.findUnique({ where: { id: id } });

    // check if card exists
    const exists = card !== null;
    if (!exists) {
        next({
            message: "The card you are deleting does not exist",
            status: 404,
        });
        return;
    }

    let updateUser = null;

    updateUser = await prisma.card.update({
        where: {
            id: id,
        },
        data: {
            upvotes: card.upvotes + 1,
        },
    });

    res.json(updateUser);
});

// [PATCH] a card to pin
server.patch("/cards/:id/pin", async (req, res, next) => {
    let id = req.params.id;

    // make sure id is Integer
    if (isNaN(id)) {
        next({ message: "ID of the card has to be an integer", status: 400 });
        return;
    }

    id = parseInt(id);

    let card = await prisma.card.findUnique({ where: { id: id } });

    // check if card exists
    const exists = card !== null;
    if (!exists) {
        next({
            message: "The card you are deleting does not exist",
            status: 404,
        });
        return;
    }

    let updateUser = null;

    // Check if card is pinnes / unpinned. Update accordingly
    if (card.is_pinned) {
        updateUser = await prisma.card.update({
            where: {
                id: id,
            },
            data: {
                is_pinned: false,
                pinned_at: null,
            },
        });
    } else {
        updateUser = await prisma.card.update({
            where: {
                id: id,
            },
            data: {
                is_pinned: true,
                pinned_at: new Date(Date.now()),
            },
        });
    }

    res.json(updateUser);
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
