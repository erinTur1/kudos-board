import { useState, useEffect } from 'react';
import Board from "./Board";
import "../styles/BoardList.css"

const BoardList = ({ boards, deleteBoardById }) => {

    const deleteBoard = (id) => {
        deleteBoardById(id);
    };

    return <section className="board-list-container">
        {
            boards.map((board) => {
                return <Board 
                key={board.id}
                boardData={board}
                handleDeleteBoard={deleteBoard}
                />
            })
        }

    </section>}

export default BoardList;