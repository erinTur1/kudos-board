const cors = require('cors');
const express = require('express');
const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); 

//get all boards
app.get('/boards', async (req, res) => {
    try {
        const boards = await prisma.board.findMany({
            include: {
                cards: true,
            }
        });
        res.status(200).json(boards);
    } catch (error) {
        console.error(error);
        res.status(500).send('Could not get boards');
    }
});

//get board by id - remove?
app.get('/boards/:boardId', async (req, res) => {
    const boardId = parseInt(req.params.boardId);
    try {
        const board = await prisma.board.findUnique({
            where: {
                id: boardId,
            },
            include: {
                cards: true,
            }
        });
        res.status(200).json(board);
    } catch (error) {
        console.error(error);
        res.status(500).send('Could not get board');
    }
});

//create board
app.post('/boards', async (req, res) => {
    const { title, category, author, image_url } = req.body;
    try {
        const newBoard = await prisma.board.create({
            data: {
                title,
                category, 
                author, 
                image_url
            }
        });
        res.status(201).json(newBoard);
    } catch (error) {
        console.error(error);
        res.status(500).send('Could not create board');
    }
    
});

//delete board by id
app.delete('/boards/:boardId', async (req, res) => {
    const { boardId } = req.params;
    try {

        const board = await prisma.board.findUnique({
            where: {
                id: parseInt(boardId),
            }
        });

        if (!board) {
            res.status(404).send('Board by this id does not exist');
        }
        const deletedBoard = await prisma.board.delete({
            where: { id: parseInt(boardId) }
        })
        res.status(204).json(deletedBoard);

    } catch (error) {
        console.error(error);
        res.status(500).send('Could not delete board');
    }
})

//get cards by board id and order by pinned first (in the order they were pinned) then not pinned
app.get('/boards/:boardId/cards', async (req, res) => {
    const boardId = parseInt(req.params.boardId);
    try {
        const cards = await prisma.card.findMany({
            where: {
                boardId: boardId,
            },
            orderBy: [
                {isPinned: 'desc'}, //first order by pinned then unpinned
                {pinOrder: 'desc'} //then order by order cards were pinned in
            ]
        });
        res.status(200).json(cards);
    } catch (error) {
        console.error(error);
        res.status(500).send('Could not get board');
    }
});

//create card
app.post('/boards/:boardId/cards', async (req, res) => {
    const { title, message, gif_url, author, numVotes, isPinned} = req.body;
    const boardId = parseInt(req.params.boardId);

    try {
        const newCard = await prisma.card.create({
            data: {
                title,
                boardId,
                message, 
                gif_url,
                author,
                numVotes,
                isPinned,
            }
        });
        res.status(201).json(newCard);

    } catch (error) {
        console.error(error);
        res.status(500).send('Could not create card');
    }
});

//update card upvotes
app.put('/boards/:boardId/cards/:cardId/upvote', async (req, res) => {
    const cardId = parseInt(req.params.cardId);

    try {
        const card = await prisma.card.findUnique({
            where: {
                id: cardId,
            }
        });

        if (!card) {
            res.status(404).send('Card by this id does not exist');
        }

        const updatedCard = await prisma.card.update({
            where: {id: cardId},
            data: {
               numVotes: card.numVotes + 1
            }
        })
        res.status(200).json(updatedCard);
    } catch (error) {
        console.error(error);
        res.status(500).send('Could not upvote card');
    }

});

//update card (pinned or upvote)
app.put('/boards/:boardId/cards/:cardId/pin', async (req, res) => {
    const cardId = parseInt(req.params.cardId);


    try {
        const card = await prisma.card.findUnique({
            where: {
                id: cardId,
            }
        });

        if (!card) {
            res.status(404).send('Card by this id does not exist');
        }

        let newPinOrder = card.pinOrder
        if (newPinOrder == -1) { //if card is not already pinned
            // newPinOrder = await prisma.card.findFirst().pinOrder + 1;
            const lastPinnedCard = await prisma.card.findFirst({
                orderBy: { pinOrder: 'desc'}
            });

            lastPinnedCard? (newPinOrder = lastPinnedCard.pinOrder + 1) : (newPinOrder = 1);

        } else { //if card is already pinned
            newPinOrder = -1;
        }

        const updatedCard = await prisma.card.update({
            where: {id: cardId},
            data: {
               isPinned: !card.isPinned,
               pinOrder: newPinOrder
            }
        })
        res.status(200).json(updatedCard);
    } catch (error) {
        console.error(error);
        res.status(500).send('Could not pin card');
    }

});

//delete card by id
app.delete('/boards/:boardId/cards/:cardId', async (req, res) => {
    const boardId = parseInt(req.params.boardId);
    const cardId = parseInt(req.params.cardId);

    try {
        const card = await prisma.card.findUnique({
            where: {
                id: cardId,
            }
        });

        if (!card) {
            res.status(404).send('Card by this id does not exist');
        }

        const deletedCard = await prisma.card.delete({
            where: {id: cardId}
        })
        res.status(204).json(deletedCard);
    } catch (error) {
        console.error(error);
        res.status(500).send('Could not delete card');
    }
})



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})