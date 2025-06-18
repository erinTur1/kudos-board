import { useNavigate } from  "react-router";
import "../styles/Board.css"
const Board = ({boardData, handleDeleteBoard}) => {


    const navigate = useNavigate();
   
    const handleDelete = () => {
        handleDeleteBoard(boardData.id);
    }

    return <div className="board">
        <img src={boardData.image_url}/>
        <h2>{boardData.title}</h2>
        <p>{boardData.description}</p>
        <div>
            <button onClick={() => {
                navigate(`/boards/${boardData.id}`, { state: {boardName: `${boardData.title}`}})
            }}>View Board</button>
            <button onClick={handleDelete}>Delete Board</button>
        </div>
    </div>
}

export default Board;