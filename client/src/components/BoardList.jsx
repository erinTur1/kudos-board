import { Suspense } from 'react';
import Board from "./Board";
import "../styles/BoardList.css"

const BoardList = ({ boards, deleteBoardById }) => {

    return <section className="board-list-container">
        <Suspense fallback={<p>Loading...</p>}>
            {
                boards.map((board) => {
                    return <Board 
                    key={board.id}
                    boardData={board}
                    handleDeleteBoard={(id) => {
                        deleteBoardById(id);
                    }}
                    />
                })
            }
        </Suspense>

    </section>}

export default BoardList;