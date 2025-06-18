import { useState, useEffect, useRef } from 'react';
import Header from "../components/Header";
import SearchForm from "../components/SearchForm";
import BoardList from "../components/BoardList";
import Footer from "../components/Footer";
import CreateForm from "../components/CreateForm";
import FilterOptions from '../components/FilterOptions';
import { filterByRecent, filterByCategory } from "../utils/utils";

const HomePage = () => {

    //boards state var and setBoards with the fetch call
    const defaultBoards = useRef([]);
    const [boards, setBoards] = useState([]);
    const [searchRequest, setSearchRequest] = useState('');
    //useEffect fetch all api boards 
    useEffect(() => {
        fetchBoards();
        
    }, []);

    const fetchBoards = () => {
        fetch('http://localhost:3000/boards')
            .then(response => response.json())
            .then(data => {
                setBoards(data);
                defaultBoards.current = data;
            })
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
                defaultBoards.current = boards.filter(board => board.id !== parseInt(boardId));
            }
        })
        .catch(error => console.error(error))

    };

    const appendNewBoard = (newBoard) => {
        setBoards([...boards, newBoard]);
        defaultBoards.current = [...defaultBoards, newBoard];
    }

    const filterBoards = (filter) => {
        //ENUMS NEEDED
        if (filter === "recent") {
            const updatedBoards = filterByRecent(defaultBoards.current);
            setBoards(updatedBoards);
        } else if (filter === "all") {
            fetchBoards(); //BETTER OPTION THAN REFETCHING?
        } else { 
            const updatedBoards = filterByCategory(defaultBoards.current, filter);
            setBoards(updatedBoards);
        }
    }

    const handleSearchChange = (newSearchRequest) => {
        setSearchRequest(newSearchRequest); //might be able to move this state to SearchForm

        //commented out below because changed to not have search-as-you-type functionality
            //(following exact project instructions)

        // const newBoards = defaultBoards.current.filter(board => 
        //     board.title.includes(newSearchRequest)
        // );
        // setBoards(newBoards);
    }

    const handleSearchSubmit = (newSearchRequest) => {
        setSearchRequest(newSearchRequest);
        const newBoards = defaultBoards.current.filter(board => 
            board.title.includes(newSearchRequest)
        );
        setBoards(newBoards);
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