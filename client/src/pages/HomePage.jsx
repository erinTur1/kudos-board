import Header from "../components/Header";
import SearchForm from "../components/SearchForm";
import BoardList from "../components/BoardList";
import Footer from "../components/Footer";

const HomePage = () => {
    return (
        <div id="home-page">
            <Header />
            <SearchForm />
            <BoardList />
            <Footer />
        </div>
    );
}


export default HomePage;