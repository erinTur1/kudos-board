import "../styles/Card.css";

const Card = ({cardData, handleDeleteCard}) => {

    //QUESTION: should I have a state variable here with number of updates and only when the user exits the page, it does a fetch call and 
    //updates the total num of upvotes. - or should i just do a fetch call for each upvote

    const handleDelete = () => {
        handleDeleteCard(cardData.id);
    }

    const handleUpVote = () => {

    }


    return <div className="card">
        <h2>{cardData.title}</h2>
        <p>{cardData.message}</p>
        <p>Gif link: {cardData.gif}</p> 
        <div>
            <button onClick={handleUpVote}>Upvote: {cardData.numUpVotes}</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    </div>
}


export default Card;