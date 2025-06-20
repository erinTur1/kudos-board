import { Suspense } from 'react';
import Board from "./Board";
import "../styles/BoardList.css"

const BoardList = ({ boards, deleteBoardById, errorNotif }) => {

    return <section className="board-list-container">
        { boards.length == 0? <p>{errorNotif}</p>:
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
        }
    </section>}

export default BoardList;