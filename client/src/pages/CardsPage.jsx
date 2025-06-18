import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from "../components/Header";
import CardList from "../components/CardList";
import Footer from "../components/Footer";
import CreateCardForm from "../components/CreateCardForm";

//to do
//enums global
//react suspense?
//

const CardsPage = () => {

    const location = useLocation(); //parameter is passed to CardsPage from Board.jsx on click. Need useLocation to get board name parameter sent with it
    const boardIdParam = useParams().id;

    //fetch all cards given board id

    //state variable for cards
    const [cards, setCards] = useState([]);
    //useEffect to get the cards based on Board id
    useEffect(() => {
        fetchCards();
    }, []);

    //QUESTION: should I not fetch cards and board data again and just use it from state?

    const fetchCards = () => {
        fetch(`http://localhost:3000/boards/${boardIdParam}`)
            .then(response => response.json())
            .then(data => setCards(data.cards))
            .catch(error => console.error('Error fetching boards:', error))
    };
    
    //will also need delete callback function

    const deleteCardById = (cardId) => {
        fetch(`http://localhost:3000/boards/${boardIdParam}/cards/${cardId}`, {
            method: 'DELETE',
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error ('Failed to delete card')
            } else {
                //Is there a better way to reflect the deletion on frontend?:
                setCards(cards.filter(card => card.id !== parseInt(cardId)));
            }
        })
        .catch(error => console.error(error))
    }

    const appendNewCard = (newCard) => {
        console.log("Here1: ", cards);
        console.log("Here2: ", newCard);
        setCards([...cards, newCard]);
    }

    const updateCardVotes = (cardId) => {

    }

    return (
        <div id="cards-page">
            <Header />
            <h1>{location.state.boardName}</h1>
            <CreateCardForm boardId={boardIdParam} appendNewCard={appendNewCard}/>
            <CardList 
            cards={cards}
            boardId={boardIdParam}
            deleteCardById={deleteCardById}
            // upvoteCardById={upvoteCardById}
            />
            <Footer />
        </div>
    );
}


export default CardsPage;