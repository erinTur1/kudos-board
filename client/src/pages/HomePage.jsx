import { useState, useEffect, useRef } from 'react';
import Header from "../components/Header";
import SearchForm from "../components/SearchForm";
import BoardList from "../components/BoardList";
import Footer from "../components/Footer";
import CreateBoardForm from "../components/CreateBoardForm";
import FilterOptions from '../components/FilterOptions';
import { filterByRecent, filterByCategory, FilterType } from "../utils/utils";

//This page contains the boards and is the first page rendered
const HomePage = () => {

    //reference of original boards array if needed when the 'boards' state variable is changed through filtering
    const defaultBoards = useRef([]);

    //boards state var - what is displayed to the user
    const [boards, setBoards] = useState([]);
    const [homePageNotif, setHomePageNotif] = useState("Boards show up here!");

    useEffect(() => {
        fetchBoards();
        
    }, []);

    const fetchBoards = () => {
        fetch(`${import.meta.env.VITE_DEPLOYED_URL}/boards`)
            .then(response => response.json())
            .then(data => {
                setBoards(data);
                defaultBoards.current = data;
            })
            .catch(error => console.error('Error fetching boards:', error))
    };

    const deleteBoardById = (boardId) => {
        fetch(`${import.meta.env.VITE_DEPLOYED_URL}/boards/${boardId}`, {
            method: 'DELETE',
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error ('Failed to delete board')
            } else {
                setBoards(boards.filter(board => board.id !== parseInt(boardId)));
                defaultBoards.current = boards.filter(board => board.id !== parseInt(boardId));
                if (defaultBoards.current.length == 0) setHomePageNotif("Boards show up here!");
            }
        })
        .catch(error => console.error(error))

    };

    //called after a new board was posted in the database - need to render visually
    const appendNewBoard = (newBoard) => {
        setBoards([...boards, newBoard]);
        defaultBoards.current = [...defaultBoards.current, newBoard];
    }

    const filterBoards = (filter) => {
        //see enum and helper functions in utils.js
        if (filter === FilterType.RECENT) {
            const updatedBoards = filterByRecent(defaultBoards.current);
            setBoards(updatedBoards);
        } else if (filter === FilterType.ALL) {
            setBoards(defaultBoards.current);
        } else { 
            const updatedBoards = filterByCategory(defaultBoards.current, filter);
            setBoards(updatedBoards);
        }
    }

    //called when user actually searches 
    const handleSearchSubmit = (newSearchRequest, isASearch) => {
        isASearch? setHomePageNotif("No results found"): setHomePageNotif("");
        
        const newBoards = defaultBoards.current.filter(board => 
            board.title.includes(newSearchRequest)
        );
        setBoards(newBoards);
    }


    return (
        <div id="home-page">
            <Header isBackArrowActive={false}/>
            <SearchForm onSubmitSearch={handleSearchSubmit}/>
            <FilterOptions filterBoards={filterBoards}/>
            <CreateBoardForm appendNewBoard={appendNewBoard}/>
            <BoardList boards={boards} deleteBoardById={deleteBoardById} errorNotif={homePageNotif}/>
            <Footer />
        </div>
    );
}


export default HomePage;