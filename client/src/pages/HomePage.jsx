import { useState, useEffect } from 'react';
import Header from "../components/Header";
import SearchForm from "../components/SearchForm";
import BoardList from "../components/BoardList";
import Footer from "../components/Footer";
import CreateForm from "../components/CreateForm";

const HomePage = () => {

    //boards state var and setBoards with the fetch call
    const [boards, setBoards] = useState([]);

    //useEffect fetch all api boards 
    useEffect(() => {
        fetchBoards();
    }, []);

    const fetchBoards = () => {
        fetch('http://localhost:3000/boards')
            .then(response => response.json())
            .then(data => setBoards(data))
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


    return (
        <div id="home-page">
            <Header />
            <SearchForm />
            <CreateForm appendNewBoard={appendNewBoard}/>
            <BoardList boards={boards} deleteBoardById={deleteBoardById}/>
            <Footer />
        </div>
    );
}


export default HomePage;