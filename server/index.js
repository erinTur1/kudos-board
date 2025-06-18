const cors = require('cors');
const express = require('express');
const app = express();
const PORT = 3000;

let boards = [
    {
        "id": 0,
        "title": "funny study inspo",
        //make enum?
        "category": "Inspiration",
        "author": "erin",
        "boardImg": "../assets/movie-img-placeholder.png",
        "time_created": 1750214316708,
        "cards": [
            {
                "id": 0,
                "title": "title1",
                "message": "code1",
                "gif": 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG45aGthMDkwcmNyaHM4Y29hdGxsaWRwejB4a2l3MG92cTc5a2s5biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HzPtbOKyBoBFsK4hyc/giphy.gif',
                "numVotes": 3,
            },
            {
                "id": 1,
                "title": "title2",
                "message": "code2",
                "gif": 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG45aGthMDkwcmNyaHM4Y29hdGxsaWRwejB4a2l3MG92cTc5a2s5biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HzPtbOKyBoBFsK4hyc/giphy.gif',
                "numVotes": 2,
            },
            {
                "id": 2,
                "title": "title3",
                "message": "code3",
                "gif": 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG45aGthMDkwcmNyaHM4Y29hdGxsaWRwejB4a2l3MG92cTc5a2s5biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HzPtbOKyBoBFsK4hyc/giphy.gif',
                "numVotes": 30,
            },
            
        ]
    },
    {
        "id": 1,
        "title": "NEWworkout inspo",
        "category": "Celebration",
        "author": "erin",
        "boardImg": "../assets/movie-img-placeholder.png",
        "time_created": 1750214317708,
        "cards": [
            {
                "id": 0,
                "title": "title4",
                "message": "exercise1",
                "gif": 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG45aGthMDkwcmNyaHM4Y29hdGxsaWRwejB4a2l3MG92cTc5a2s5biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HzPtbOKyBoBFsK4hyc/giphy.gif',
                "numVotes": 3,
            },
            {
                "id": 1,
                "title": "title5",
                "message": "exercise2",
                "gif": 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG45aGthMDkwcmNyaHM4Y29hdGxsaWRwejB4a2l3MG92cTc5a2s5biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HzPtbOKyBoBFsK4hyc/giphy.gif',
                "numVotes": 2,
            },
            {
                "id": 2,
                "title": "title6",
                "message": "exercise3",
                "gif": 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG45aGthMDkwcmNyaHM4Y29hdGxsaWRwejB4a2l3MG92cTc5a2s5biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HzPtbOKyBoBFsK4hyc/giphy.gif',
                "numVotes": 30,
            },
            
        ]
    },
    {
        "id": 2,
        "title": "workout inspo",
        "category": "Celebration",
        "author": "erin",
        "boardImg": "../assets/movie-img-placeholder.png",
        "time_created": 1750214316708,
        "cards": [
            {
                "id": 0,
                "title": "title4",
                "message": "exercise1",
                "gif": 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG45aGthMDkwcmNyaHM4Y29hdGxsaWRwejB4a2l3MG92cTc5a2s5biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HzPtbOKyBoBFsK4hyc/giphy.gif',
                "numVotes": 3,
            },
            {
                "id": 1,
                "title": "title5",
                "message": "exercise2",
                "gif": 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG45aGthMDkwcmNyaHM4Y29hdGxsaWRwejB4a2l3MG92cTc5a2s5biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HzPtbOKyBoBFsK4hyc/giphy.gif',
                "numVotes": 2,
            },
            {
                "id": 2,
                "title": "title6",
                "message": "exercise3",
                "gif": 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG45aGthMDkwcmNyaHM4Y29hdGxsaWRwejB4a2l3MG92cTc5a2s5biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HzPtbOKyBoBFsK4hyc/giphy.gif',
                "numVotes": 30,
            },
            
        ]
    },
    {
        "id": 3,
        "title": "NEWworkout inspo",
        "category": "Celebration",
        "author": "erin",
        "boardImg": "../assets/movie-img-placeholder.png",
        "time_created": 1750214317708,
        "cards": [
            {
                "id": 0,
                "title": "title4",
                "message": "exercise1",
                "gif": 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG45aGthMDkwcmNyaHM4Y29hdGxsaWRwejB4a2l3MG92cTc5a2s5biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HzPtbOKyBoBFsK4hyc/giphy.gif',
                "numVotes": 3,
            },
            {
                "id": 1,
                "title": "title5",
                "message": "exercise2",
                "gif": 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG45aGthMDkwcmNyaHM4Y29hdGxsaWRwejB4a2l3MG92cTc5a2s5biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HzPtbOKyBoBFsK4hyc/giphy.gif',
                "numVotes": 2,
            },
            {
                "id": 2,
                "title": "title6",
                "message": "exercise3",
                "gif": 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG45aGthMDkwcmNyaHM4Y29hdGxsaWRwejB4a2l3MG92cTc5a2s5biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HzPtbOKyBoBFsK4hyc/giphy.gif',
                "numVotes": 30,
            },
            
        ]
    },
    {
        "id": 4,
        "title": "NEWworkout inspo",
        "category": "Celebration",
        "author": "erin",
        "boardImg": "../assets/movie-img-placeholder.png",
        "time_created": 1750214317708,
        "cards": [
            {
                "id": 0,
                "title": "title4",
                "message": "exercise1",
                "gif": 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG45aGthMDkwcmNyaHM4Y29hdGxsaWRwejB4a2l3MG92cTc5a2s5biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HzPtbOKyBoBFsK4hyc/giphy.gif',
                "numVotes": 3,
            },
            {
                "id": 1,
                "title": "title5",
                "message": "exercise2",
                "gif": 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG45aGthMDkwcmNyaHM4Y29hdGxsaWRwejB4a2l3MG92cTc5a2s5biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HzPtbOKyBoBFsK4hyc/giphy.gif',
                "numVotes": 2,
            },
            {
                "id": 2,
                "title": "title6",
                "message": "exercise3",
                "gif": 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG45aGthMDkwcmNyaHM4Y29hdGxsaWRwejB4a2l3MG92cTc5a2s5biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HzPtbOKyBoBFsK4hyc/giphy.gif',
                "numVotes": 30,
            },
            
        ]
    },
    {
        "id": 5,
        "title": "fun inspo",
        "category": "Celebration",
        "author": "erin",
        "boardImg": "../assets/movie-img-placeholder.png",
        "time_created": 1750214316708,
        "cards": [
            {
                "id": 0,
                "title": "title7",
                "message": "fun1",
                "gif": 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG45aGthMDkwcmNyaHM4Y29hdGxsaWRwejB4a2l3MG92cTc5a2s5biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HzPtbOKyBoBFsK4hyc/giphy.gif',
                "numVotes": 3,
            },
            {
                "id": 1,
                "title": "title8",
                "message": "fun2",
                "gif": 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG45aGthMDkwcmNyaHM4Y29hdGxsaWRwejB4a2l3MG92cTc5a2s5biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HzPtbOKyBoBFsK4hyc/giphy.gif',
                "numVotes": 2,
            },
            {
                "id": 2,
                "title": "title9",
                "message": "fun3",
                "gif": 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG45aGthMDkwcmNyaHM4Y29hdGxsaWRwejB4a2l3MG92cTc5a2s5biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HzPtbOKyBoBFsK4hyc/giphy.gif',
                "numVotes": 30,
            },
            
        ]
    },
    {
        "id": 6,
        "title": "NEWworkout inspo",
        "category": "Celebration",
        "author": "erin",
        "boardImg": "../assets/movie-img-placeholder.png",
        "time_created": 1750214317708,
        "cards": [
            {
                "id": 0,
                "title": "title4",
                "message": "exercise1",
                "gif": 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG45aGthMDkwcmNyaHM4Y29hdGxsaWRwejB4a2l3MG92cTc5a2s5biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HzPtbOKyBoBFsK4hyc/giphy.gif',
                "numVotes": 3,
            },
            {
                "id": 1,
                "title": "title5",
                "message": "exercise2",
                "gif": 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG45aGthMDkwcmNyaHM4Y29hdGxsaWRwejB4a2l3MG92cTc5a2s5biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HzPtbOKyBoBFsK4hyc/giphy.gif',
                "numVotes": 2,
            },
            {
                "id": 2,
                "title": "title6",
                "message": "exercise3",
                "gif": 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG45aGthMDkwcmNyaHM4Y29hdGxsaWRwejB4a2l3MG92cTc5a2s5biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HzPtbOKyBoBFsK4hyc/giphy.gif',
                "numVotes": 30,
            },
            
        ]
    },

];
app.use(cors());
app.use(express.json()); 

//get all boards
app.get('/boards', (req, res) => {
    res.send(boards);
});

//get board by id
app.get('/boards/:boardId', (req, res) => {
    const boardId = parseInt(req.params.boardId);
    const board = boards.find(board => board.id === boardId);

    if (board) {
        res.json(board);
    } else {
        res.status(404).send('Board not found!')
    }
});

//create board
app.post('/boards', (req, res) => {
    const receivedBoardData = req.body;
    const newBoard = {
        id: boards.length,
        ...receivedBoardData
    };

    boards.push(newBoard);

    res.status(201).send(newBoard);
});

//delete board by id
app.delete('/boards/:boardId', (req, res) => {
    const { boardId } = req.params;
    const initialLength = boards.length;
    boards = boards.filter(board => board.id !== parseInt(boardId));

    if (boards.length < initialLength) {
        res.status(204).send();
    } else {
        res.status(404).send('Board not found');
    }
})

//create card
app.post('/boards/:boardId/cards', (req, res) => {
    const receivedCardData = req.body;
    const boardId = parseInt(req.params.boardId);
    const board = boards.find(board => board.id === boardId);
    const newCard = {
        id: board.cards.length,
        numVotes: 0,
        ...receivedCardData
    };

    board.cards.push(newCard);

    res.status(201).send(newCard);
});

//update card upvotes
app.put('/boards/:boardId/cards/:cardId', (req, res) => {
    const boardId = parseInt(req.params.boardId);
    const cardId = parseInt(req.params.cardId);
    const board = boards.find(board => board.id === boardId);
    //NEED NULL BOARD CHECK HERE 
    const cardInd = board.cards.findIndex(card => card.id === cardId);

    if(cardInd != -1) {
        const updatedCardInfo = req.body;
        board.cards[cardInd] = { ...board.cards[cardInd], ...updatedCardInfo };
        res.json(board.cards[cardInd])
    } else {
        res.status(404).send('Card not found');
    }

});

//delete card by id
//BETTER WAY TO DO THIS?
app.delete('/boards/:boardId/cards/:cardId', (req, res) => {
    const boardId = parseInt(req.params.boardId);
    const cardId = parseInt(req.params.cardId);
    //first get board by id
    const board = boards.find(board => board.id === boardId);
    //get initial number of the cards in this board
    const initialLength = board.cards.length;
    board.cards = board.cards.filter(card => card.id !== parseInt(cardId));
    

    if (board.cards.length < initialLength) {
        res.status(204).send();
    } else {
        res.status(404).send('Card not found');
    }
})



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})