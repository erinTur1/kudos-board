import Card from "./Card.jsx";
import "../styles/CardList.css"

const CardList = ({ cards, boardId, deleteCardById, cardRefetch }) => {

    return <section className="card-list-container">
        {
            
            cards?.map((card) => {
                return <Card 
                key={card.id}
                cardData={card}
                boardId={boardId}
                handleDeleteCard={(id) => {
                    deleteCardById(id);
                }}
                handlePinChange={cardRefetch}
                />
            })
        }
    </section>
}

export default CardList;