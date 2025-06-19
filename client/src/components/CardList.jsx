import Card from "./Card.jsx";
import "../styles/CardList.css"

const CardList = ({ cards, boardId, deleteCardById, cardRefetch }) => {

    // const deleteCard = (id) => {
    //     deleteCardById(id)
    // }

    // const handlePinClick = () => {
    //     moveCard();
    // }


    return <section className="card-list-container">
        {
            
            cards?.map((card, index) => {
                return <Card 
                key={card.id}
                cardData={card}
                boardId={boardId}
                handleDeleteCard={(id) => {
                    deleteCardById(id);
                }}
                handlePinChange={cardRefetch}
                indexInCards={index}
                />
            })
        }
    </section>
}

export default CardList;