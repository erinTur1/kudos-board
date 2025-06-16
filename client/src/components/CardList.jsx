import { useState, useEffect } from 'react';
import Card from "./Card.jsx";
import "../styles/CardList.css"

const CardList = ({ boardId }) => {

    //state variable for cards
    const [cards, setCards] = useState([]);
    //useEffect to get the cards based on Board id
    useEffect(() => {
        fetchCards();
    }, [])

    const fetchCards = () => {
        fetch(`http://localhost:3000/boards/${boardId}`)
            .then(response => response.json())
            .then(data => setCards(data.cards))
            .catch(error => console.error('Error fetching boards:', error))
    };
    
    //will also need delete callback function


    return <section className="card-list-container">
        {
            cards?.map((card) => {
                return <Card 
                key={card.id}
                cardData={card}
                />
            })
        }
    </section>
}

export default CardList;