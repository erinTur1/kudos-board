import { useState, useEffect } from 'react';
import Board from "./Board";
import "../styles/BoardList.css"

const BoardList = () => {

    //boards state var and setBoards with the fetch call
    const [boards, setBoards] = useState([]);

    //useEffect fetch all api boards 
    useEffect(() => {
        fetchBoards();
    }, []);

    const fetchBoards = () => {
        fetch('http://localhost:3000/boards')
            .then(response => response.json())
            .then(data => setBoards(data))
            .catch(error => console.error('Error fetching boards:', error))
    };

    const deleteBoardById = (boardId) => {
        fetch(`http://localhost:3000/boards/${boardId}`, {
            method: 'DELETE',
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error ('Failed to delete board')
            } else {
                console.log("Board deleted successfully");
                //Is there a better way to reflect the deletion on frontend?:
                setBoards(boards.filter(board => board.id !== parseInt(boardId)));
            }
        })
        .catch(error => console.error(error))

    };


    //will also need delete callback function

    return <section className="board-list-container">
        {
            boards.map((board) => {
                return <Board 
                key={board.id}
                boardData={board}
                deleteBoard={deleteBoardById}
                />
            })
        }

    </section>}

export default BoardList;