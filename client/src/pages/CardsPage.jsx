import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from "../components/Header";
import CardList from "../components/CardList";
import Footer from "../components/Footer";
import CreateCardForm from "../components/CreateCardForm";

const CardsPage = () => {

    const location = useLocation(); //parameter is passed to CardsPage from Board.jsx on click. Need useLocation to get board name parameter sent with it
    const boardIdParam = useParams().id;

    //state variable for cards - what is displayed on this page
    const [cards, setCards] = useState([]);

    useEffect(() => {
        fetchCards();
    }, []);

    //get cards based on board id
    const fetchCards = () => {
        fetch(`${import.meta.env.VITE_DEPLOYED_URL}/boards/${boardIdParam}/cards`)
            .then(response => response.json())
            .then(data => setCards(data))
            .catch(error => console.error('Error fetching boards:', error))
    };
    
    const deleteCardById = (cardId) => {
        fetch(`${import.meta.env.VITE_DEPLOYED_URL}/boards/${boardIdParam}/cards/${cardId}`, {
            method: 'DELETE',
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error ('Failed to delete card')
            } else {
                //reflect deletion on the frontend
                setCards(cards.filter(card => card.id !== parseInt(cardId)));
            }
        })
        .catch(error => console.error(error))
    }

    //called after a new card was posted in the database - need to render visually
    const appendNewCard = (newCard) => {
        setCards([...cards, newCard]);
    }

    //refetch is done when cards are pinned because ordering is done through specific database fetch query - see index.js
    const cardRefetch = () => {
        fetchCards();
    }

    return (
        <div id="cards-page">
            <Header isBackArrowActive={true}/>
            <h1>{location.state.boardName}</h1>
            <CreateCardForm boardId={boardIdParam} appendNewCard={appendNewCard}/>
            <CardList 
                cards={cards}
                boardId={boardIdParam}
                deleteCardById={deleteCardById}
                cardRefetch={cardRefetch}
            />
            <Footer />
        </div>
    );
}


export default CardsPage;