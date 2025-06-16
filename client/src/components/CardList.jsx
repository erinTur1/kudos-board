import Card from "./Card.jsx";
import "../styles/CardList.css"

const CardList = ({ cards, deleteCardById }) => {

    const deleteCard = (id) => {
        deleteCardById(id)
    }


    return <section className="card-list-container">
        {
            
            cards?.map((card) => {
                return <Card 
                key={card.id}
                cardData={card}
                handleDeleteCard={deleteCard}
                />
            })
        }
    </section>
}

export default CardList;