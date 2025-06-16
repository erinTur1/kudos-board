const cors = require('cors');
const express = require('express');
const app = express();
const PORT = 3000;

let boards = [
    {
        "id": 0,
        "title": "study inspo",
        "description": "get inspo to study",
        "boardImg": "../assets/movie-img-placeholder.png",
        "cards": [
            {
                "title": "title1",
                "message": "code1",
                "gif": 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG45aGthMDkwcmNyaHM4Y29hdGxsaWRwejB4a2l3MG92cTc5a2s5biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HzPtbOKyBoBFsK4hyc/giphy.gif',
                "numUpVotes": 3
            },
            {
                "title": "title2",
                "message": "code2",
                "gif": 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG45aGthMDkwcmNyaHM4Y29hdGxsaWRwejB4a2l3MG92cTc5a2s5biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HzPtbOKyBoBFsK4hyc/giphy.gif',
                "numUpVotes": 2
            },
            {
                "title": "title3",
                "message": "code3",
                "gif": 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG45aGthMDkwcmNyaHM4Y29hdGxsaWRwejB4a2l3MG92cTc5a2s5biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HzPtbOKyBoBFsK4hyc/giphy.gif',
                "numUpVotes": 30
            },
            
        ]
    },
    {
        "id": 1,
        "title": "workout inspo",
        "description": "get inspo to workout",
        "boardImg": "../assets/movie-img-placeholder.png",
        "cards": [
            {
                "title": "title4",
                "message": "exercise1",
                "gif": 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG45aGthMDkwcmNyaHM4Y29hdGxsaWRwejB4a2l3MG92cTc5a2s5biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HzPtbOKyBoBFsK4hyc/giphy.gif',
                "numUpVotes": 3
            },
            {
                "title": "title5",
                "message": "exercise2",
                "gif": 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG45aGthMDkwcmNyaHM4Y29hdGxsaWRwejB4a2l3MG92cTc5a2s5biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HzPtbOKyBoBFsK4hyc/giphy.gif',
                "numUpVotes": 2
            },
            {
                "title": "title6",
                "message": "exercise3",
                "gif": 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG45aGthMDkwcmNyaHM4Y29hdGxsaWRwejB4a2l3MG92cTc5a2s5biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HzPtbOKyBoBFsK4hyc/giphy.gif',
                "numUpVotes": 30
            },
            
        ]
    },
    {
        "id": 2,
        "title": "fun inspo",
        "description": "get inspo to have fun",
        "boardImg": "../assets/movie-img-placeholder.png",
        "cards": [
            {
                "title": "title7",
                "message": "fun1",
                "gif": 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG45aGthMDkwcmNyaHM4Y29hdGxsaWRwejB4a2l3MG92cTc5a2s5biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HzPtbOKyBoBFsK4hyc/giphy.gif',
                "numUpVotes": 3
            },
            {
                "title": "title8",
                "message": "fun2",
                "gif": 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG45aGthMDkwcmNyaHM4Y29hdGxsaWRwejB4a2l3MG92cTc5a2s5biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HzPtbOKyBoBFsK4hyc/giphy.gif',
                "numUpVotes": 2
            },
            {
                "title": "title9",
                "message": "fun3",
                "gif": 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG45aGthMDkwcmNyaHM4Y29hdGxsaWRwejB4a2l3MG92cTc5a2s5biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HzPtbOKyBoBFsK4hyc/giphy.gif',
                "numUpVotes": 30
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

//create card

//delete board by id

//delete card by id

//upvote card


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

