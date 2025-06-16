import { useState, useEffect } from 'react';
import Card from "./Card.jsx";
import "../styles/CardList.css"

const CardList = ({ boardId }) => {

    //state variable for cards
    const [cards, setCards] = useState([]);
    //useEffect to get the cards based on Board id
    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = () => {
        fetch(`http://localhost:3000/boards/${boardId}`)
            .then(response => response.json())
            .then(data => setCards(data.cards))
            .catch(error => console.error('Error fetching boards:', error))
    };
    
    //will also need delete callback function

    const deleteCardsById = (cardId) => {
        console.log("made it here");
        fetch(`http://localhost:3000/boards/${boardId}/${cardId}`, {
            method: 'DELETE',
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error ('Failed to delete card')
            } else {
                console.log("Card deleted successfully");
                //Is there a better way to reflect the deletion on frontend?:
                setCards(cards.filter(card => card.id !== parseInt(cardId)));
            }
        })
        .catch(error => console.error(error))
    }


    return <section className="card-list-container">
        {
            
            cards?.map((card) => {
                return <Card 
                key={card.id}
                cardData={card}
                deleteCard={deleteCardsById}
                />
            })
        }
    </section>
}

export default CardList;