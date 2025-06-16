import BoardData from "../data/data.js";
import Card from "./Card.jsx";
import "../styles/CardList.css"

const CardList = ({ id }) => {

    //state variable for cards
    //useEffect to get the cards based on Board id
    
    //will also need delete callback function


    return <section className="card-list-container">
        {
            BoardData[id].cards.map((card) => {
                return <Card 
                key={card.id}
                cardData={card}
                />
            })
        }
    </section>
}

export default CardList;