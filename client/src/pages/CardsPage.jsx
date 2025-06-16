import { useParams, useLocation } from 'react-router-dom';
import Header from "../components/Header";
import CardList from "../components/CardList";
import Footer from "../components/Footer";

const CardsPage = () => {

    const location = useLocation(); //parameter is passed to CardsPage from Board.jsx on click. Need useLocation to get board name parameter sent with it
    const boardIdParam = useParams().id;

    return (
        <div id="cards-page">
            <Header />
            <h1>{location.state.boardName}</h1>
            <button>Create Card</button>
            <CardList boardId={boardIdParam}/>
            <Footer />
        </div>
    );
}


export default CardsPage;