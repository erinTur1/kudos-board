import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from "../components/Header";
import CardList from "../components/CardList";
import Footer from "../components/Footer";
import CreateCardForm from "../components/CreateCardForm";

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

    const fetchCards = () => {
        fetch(`http://localhost:3000/boards/${boardIdParam}/cards`)
            .then(response => response.json())
            .then(data => setCards(data))
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
        setCards([...cards, newCard]);
    }

    // const moveCard = (isPinned, ind) => {
    //     if(isPinned) { //need to move it to the top
    //         //swap the now pinned card with the first card in the cards array
    //         let tempCards = cards;
    //         let temp = tempCards[ind];
    //         tempCards[ind] = tempCards[0];
    //         tempCards[0] = temp;
    //         setCards[tempCards];
    //     } else { //need to move it to the end
    //         let tempCards = cards;
    //         let temp = tempCards[ind];
    //         tempCards[ind] = tempCards[cards.length - 1];
    //         tempCards[cards.length - 1] = temp;
    //         setCards[tempCards];
    //     }
    // }

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