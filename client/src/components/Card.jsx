import { useState } from 'react';
import { FaThumbtackSlash } from "react-icons/fa6";
import { FaThumbtack } from "react-icons/fa6";
import ModalCardComment from './ModalCardComment';
import "../styles/Card.css";

const Card = ({cardData, boardId, handleDeleteCard, handlePinChange}) => {

    const [numUpVotes, setNumUpVotes] = useState(cardData.numVotes);
    const [isPinned, setIsPinned] = useState(cardData.isPinned);

    //card will also handle rendering of comments modal if the card's "comment" button is clicked
    const [isCommentsModalVisible, setIsCommentsModalVisible] = useState(false);


    const handleDelete = () => {
        handleDeleteCard(cardData.id);
    }

    const handleUpVote = () => {
        //put request to increase num upvotes by 1
        fetch(`http://localhost:3000/boards/${boardId}/cards/${cardData.id}/upvote`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response) => { 
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
        //put request to change pin status
        fetch(`http://localhost:3000/boards/${boardId}/cards/${cardData.id}/pin`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response) => { 
            if (!response.ok) {
                throw new Error ('Failed to pin')
            } else {
                //need to refetch because correct pinned ordering of cards is done within the database
                handlePinChange();
                //update in state
                setIsPinned(prevState => !prevState);
                
            }
        })
        .catch(error => console.error(error))
    }


    const openModal = () => {
        setIsCommentsModalVisible(true);
    }

    const closeModal = () => {
        setIsCommentsModalVisible(false);
    }


    return <div className="card">
        {isPinned?  <FaThumbtack onClick={handlePin} className='pin-icon'/>: <FaThumbtackSlash onClick={handlePin} className='pin-icon'/>}
        <h2>{cardData.title}</h2>
        <p>{cardData.message}</p>
        <img src={cardData.gif_url}/>
        <div>
            <button onClick={handleUpVote}>Upvote: {numUpVotes}</button>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={openModal}>Comments</button>
        </div>
        {isCommentsModalVisible && <ModalCardComment closeModal={closeModal} card={cardData} boardId={boardId}/>}
    </div>
}


export default Card;