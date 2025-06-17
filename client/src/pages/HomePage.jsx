import { useState, useEffect } from 'react';
import Header from "../components/Header";
import SearchForm from "../components/SearchForm";
import BoardList from "../components/BoardList";
import Footer from "../components/Footer";
import CreateForm from "../components/CreateForm";
import FilterOptions from '../components/FilterOptions';
import { filterByRecent, filterByCategory } from "../utils/utils";

const HomePage = () => {

    //boards state var and setBoards with the fetch call
    const [boards, setBoards] = useState([]);
    const [searchRequest, setSearchRequest] = useState('');
    //useEffect fetch all api boards 
    useEffect(() => {
        fetchBoards();
    }, []);

    const fetchBoards = () => {
        fetch('http://localhost:3000/boards')
            .then(response => response.json())
            .then(data => {setBoards(data)})
            .catch(error => console.error('Error fetching boards:', error))
    };

    const deleteBoardById = (boardId) => {
        fetch(`http://localhost:3000/boards/${boardId}`, {
            method: 'DELETE',
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error ('Failed to delete board')
            } else {
                console.log("Board deleted successfully");
                //Is there a better way to reflect the deletion on frontend?:
                setBoards(boards.filter(board => board.id !== parseInt(boardId)));
            }
        })
        .catch(error => console.error(error))

    };

    const appendNewBoard = (newBoard) => {
        setBoards([...boards, newBoard]);
    }

    const filterBoards = (filter) => {
        //ENUMS NEEDED
        if (filter === "recent") {
            filterByRecent(); //make api call instead???
        } else if (filter === "all") {
            fetchBoards(); //BETTER OPTION THAN REFETCHING?
        } else { 
            setBoards(filterByCategory(boards, filter));
        }
    }

    const handleSearchChange = (newSearchRequest) => {
        setSearchRequest(newSearchRequest); //might be able to move this state to SearchForm
        const newBoards = boards.filter(board => 
            board.title.includes(newSearchRequest)
        );
        setBoards(newBoards);
    }

    const handleSearchSubmit = (newSearchRequest) => {

    }

    return (
        <div id="home-page">
            <Header />
            <SearchForm 
            searchRequest={searchRequest} 
            onSearchChange={handleSearchChange} 
            onSubmitSearch={handleSearchSubmit}/>
            <FilterOptions filterBoards={filterBoards}/>
            <CreateForm appendNewBoard={appendNewBoard}/>
            <BoardList boards={boards} deleteBoardById={deleteBoardById}/>
            <Footer />
        </div>
    );
}


export default HomePage;