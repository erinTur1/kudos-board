import { useState } from 'react';
import { FaThumbtackSlash } from "react-icons/fa6";
import { FaThumbtack } from "react-icons/fa6";
import "../styles/Card.css";

const Card = ({cardData, boardId, handleDeleteCard, handleUpVoteCard}) => {

    const [numUpVotes, setNumUpVotes] = useState(cardData.numVotes);
    const [isPinned, setIsPinned] = useState(cardData.isPinned);

    //QUESTION: should I have a state variable here with number of updates and only when the user exits the page, it does a fetch call and 
    //updates the total num of upvotes. - or should i just do a fetch call for each upvote

    const handleDelete = () => {
        handleDeleteCard(cardData.id);
    }

    const handleUpVote = () => {
        //put request
        fetch(`http://localhost:3000/boards/${boardId}/cards/${cardData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => { //QUESTION:is putting async like this ok?
            if (!response.ok) {
                throw new Error ('Failed to upvote')
            } else {
                //update in state
                setNumUpVotes(numUpVotes + 1);
            }
        })
        .catch(error => console.error(error))

    }

    const handlePin = () => {
        setIsPinned(prevState => !prevState);
    }


    return <div className="card">
        {isPinned?  <FaThumbtack onClick={handlePin} className='pin-icon'/>: <FaThumbtackSlash onClick={handlePin} className='pin-icon'/>}
        <h2>{cardData.title}</h2>
        <p>{cardData.message}</p>
        <img src={cardData.gif_url}/>
        <div>
            <button onClick={handleUpVote}>Upvote: {numUpVotes}</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    </div>
}


export default Card;