import Board from "./Board";
import BoardData from "../data/data.js"
import "../styles/BoardList.css"

const BoardList = () => {

    //boards state var and setBoards with the fetch call
    //useEffect fetch all api boards 

    //will also need delete callback function

    return <section className="board-list-container">
        {
            BoardData.map((board) => {
                return <Board 
                key={board.id}
                boardData={board}
                />
            })
        }

    </section>}

export default BoardList;