import { useNavigate } from  "react-router";
import "../styles/Board.css"
const Board = ({boardData, handleDeleteBoard}) => {

    const navigate = useNavigate();

    return <div className="board" onClick={() => {
                //need to navigate to CardsPage when we click on the board
                navigate(`/boards/${boardData.id}`, { state: {boardName: `${boardData.title}`}})
            }}>
        <img src={boardData.image_url}/>
        <h2>{boardData.title}</h2>
        <p>{boardData.description}</p>
        <div>
            <button onClick={(event) => {
                event.stopPropagation();
                handleDeleteBoard(boardData.id) //callback to HomePage so that deleted board can be rendered visually 
            }}>Delete Board</button>
        </div>
        {boardData.author != "" && <p>Author: {boardData.author}</p>}
    </div>
}

export default Board;