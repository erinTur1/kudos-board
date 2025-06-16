import { useParams } from 'react-router-dom';
import Header from "../components/Header";
import CardList from "../components/CardList";
import Footer from "../components/Footer";

const CardsPage = () => {

    const boardId = useParams().id;
    console.log("here: ", boardId);

    return (
        <div id="cards-page">
            <Header />
            <CardList id={boardId}/>
            <Footer />
        </div>
    );
}


export default CardsPage;