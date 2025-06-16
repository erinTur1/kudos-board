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


    //will also need delete callback function

    return <section className="board-list-container">
        {
            boards.map((board) => {
                return <Board 
                key={board.id}
                boardData={board}
                />
            })
        }

    </section>}

export default BoardList;