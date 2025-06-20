import { useState, useEffect, useRef } from 'react';
import Header from "../components/Header";
import SearchForm from "../components/SearchForm";
import BoardList from "../components/BoardList";
import Footer from "../components/Footer";
import CreateForm from "../components/CreateForm";
import FilterOptions from '../components/FilterOptions';
import LightDarkToggle from "../components/LightDarkToggle";
import { filterByRecent, filterByCategory, FilterType } from "../utils/utils";

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
        //works!
        fetch('http://localhost:3000/boards')
            .then(response => response.json())
            .then(data => {
                setBoards(data);
                defaultBoards.current = data;
            })
            .catch(error => console.error('Error fetching boards:', error))
    };

    const deleteBoardById = (boardId) => {
        //works!
        fetch(`http://localhost:3000/boards/${boardId}`, {
            method: 'DELETE',
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error ('Failed to delete board')
            } else {
                //Is there a better way to reflect the deletion on frontend?:
                setBoards(boards.filter(board => board.id !== parseInt(boardId)));
                defaultBoards.current = boards.filter(board => board.id !== parseInt(boardId));
            }
        })
        .catch(error => console.error(error))

    };

    const appendNewBoard = (newBoard) => {
        setBoards([...boards, newBoard]);
        console.log(defaultBoards);
        defaultBoards.current = [...defaultBoards.current, newBoard];
    }

    const filterBoards = (filter) => {
        if (filter === FilterType.RECENT) {
            const updatedBoards = filterByRecent(defaultBoards.current);
            setBoards(updatedBoards);
        } else if (filter === FilterType.ALL) {
            //fetchBoards(); //use default boards?
            setBoards(defaultBoards.current);
        } else { 
            const updatedBoards = filterByCategory(defaultBoards.current, filter);
            setBoards(updatedBoards);
        }
    }

    const handleSearchChange = (newSearchRequest) => {
        setSearchRequest(newSearchRequest); //might be able to move this state to SearchForm
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
            <Header isBackArrowActive={false}/>
            {/* <LightDarkToggle /> */}
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