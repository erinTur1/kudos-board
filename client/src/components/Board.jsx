import { useNavigate } from  "react-router";
import "../styles/Board.css"
const Board = ({boardData}) => {


    const navigate = useNavigate();
   
    const handleDelete = () => {

    }

    return <div className="board">
        <img src={boardData.boardImg}/>
        <h2>{boardData.title}</h2>
        <p>{boardData.description}</p>
        <div>
            <button onClick={() => {
                navigate(`/cards/${boardData.id}`)
            }}>View Board</button>
            <button onClick={handleDelete}>Delete Board</button>
        </div>
    </div>
}

export default Board;