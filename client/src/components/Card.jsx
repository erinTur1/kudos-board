import "../styles/Card.css";

const Card = ({cardData, deleteCard}) => {

    const handleDelete = () => {
        console.log("here?:",cardData.id);
        deleteCard(cardData.id);
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