import Card from "./Card.jsx";
import "../styles/CardList.css"

const CardList = ({ cards, boardId, deleteCardById, upvoteCardById }) => {

    const deleteCard = (id) => {
        deleteCardById(id)
    }


    return <section className="card-list-container">
        {
            
            cards?.map((card) => {
                return <Card 
                key={card.id}
                cardData={card}
                boardId={boardId}
                handleDeleteCard={deleteCard}
                />
            })
        }
    </section>
}

export default CardList;