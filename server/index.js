import cors from 'cors';
import express, { json } from 'express';
import { PrismaClient } from './generated/prisma';

// const cors = require('cors');
// const express = require('express');
// const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient();
const app = express();
const PORT = 3000;


app.use(cors());
app.use(json()); 

//get all boards
app.get(`${import.meta.env.DEPLOYED_URL}/boards`, async (req, res) => {
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

//get board by id
app.get(`${import.meta.env.DEPLOYED_URL}/boards/:boardId`, async (req, res) => {
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
app.post(`${import.meta.env.DEPLOYED_URL}/boards`, async (req, res) => {
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
app.delete(`${import.meta.env.DEPLOYED_URL}/boards/:boardId`, async (req, res) => {
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

//create card
app.post(`${import.meta.env.DEPLOYED_URL}/boards/:boardId/cards`, async (req, res) => {
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
                isPinned 
            }
        });
        res.status(201).json(newCard);

    } catch (error) {
        console.error(error);
        res.status(500).send('Could not create card');
    }
});

//update card upvotes
app.put(`${import.meta.env.DEPLOYED_URL}/boards/:boardId/cards/:cardId`, async (req, res) => {
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

//delete card by id
app.delete(`${import.meta.env.DEPLOYED_URL}/boards/:boardId/cards/:cardId`, async (req, res) => {
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