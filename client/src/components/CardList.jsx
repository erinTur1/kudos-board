import { Suspense } from 'react';
import Card from "./Card.jsx";
import "../styles/CardList.css"

const CardList = ({ cards, boardId, deleteCardById, cardRefetch }) => {

    return <section className="card-list-container">
        {cards.length == 0? <p>Your cards will load here!</p> :

        <Suspense fallback={<p>Loading...</p>}>
            {
                cards.map((card) => {
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
        </Suspense>
        }
    </section>
}

export default CardList;