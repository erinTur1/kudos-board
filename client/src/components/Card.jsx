import { useState } from 'react';
import { FaThumbtackSlash } from "react-icons/fa6";
import { FaThumbtack } from "react-icons/fa6";
import ModalCardComment from './ModalCardComment';
import "../styles/Card.css";

const Card = ({cardData, boardId, handleDeleteCard, handlePinChange}) => {

    const [numUpVotes, setNumUpVotes] = useState(cardData.numVotes);
    const [isPinned, setIsPinned] = useState(cardData.isPinned);


    const handleDelete = () => {
        handleDeleteCard(cardData.id);
    }

    const handleUpVote = () => {
        //put request
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
        //put request
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

    //should probably move this to modal component
    const [isModalVisible, setIsModalVisible] = useState(false);

    const openModal = () => {
        setIsModalVisible(true);
    }

    const closeModal = () => {
        setIsModalVisible(false);
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
        {isModalVisible && <ModalCardComment closeModal={closeModal} card={cardData} boardId={boardId}/>}
    </div>
}


export default Card;