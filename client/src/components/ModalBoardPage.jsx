import { FilterType } from "../utils/utils"
import "../styles/Modal.css"

//for modal that pops up when you create a new board
const ModalBoardPage = ({ closeModal, appendNewBoard }) => {

    const postBoard = (newBoardTitle, newBoardCategory, newBoardAuthor) => {
        fetch(`${import.meta.env.VITE_DEPLOYED_URL}/boards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "title": newBoardTitle,
                "category": newBoardCategory,
                "author": newBoardAuthor,
                "image_url": `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000 + 1)}`
            }),
        })
        .then(async(response) => { 
            if (!response.ok) {
                throw new Error ('Failed to create board')
            } else {
                const newBoard = await response.json();
                appendNewBoard(newBoard); //call back to HomePage so that the new board can be rendered visually right away
            }
        })
        .catch(error => console.error(error))

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const newBoardTitle = formData.get('title');
        const newBoardCategory = formData.get('category');
        const newBoardAuthor = formData.get('author');

        postBoard(newBoardTitle, newBoardCategory, newBoardAuthor);
        
    }

    return <div className="modal-overlay"> 
        <div className="modal-popup">       
            <div className="modal-content">
                <button className="close-btn" onClick={closeModal}>X</button>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="titleInput">Title (required):</label><br />
                    <input required type="text" id="title-input" name="title"></input><br />
                    <label htmlFor="category">Category (required):</label><br />
                    <select required id="category" name="category" defaultValue="">
                        <option disabled value={FilterType.NONE}>Select a category</option>
                        <option value={FilterType.CELEBRATION}>Celebration</option>
                        <option value={FilterType.THANK_YOU}>Thank you</option>
                        <option value={FilterType.INSPIRATION}>Inspiration</option>
                    </select><br />
                    <label htmlFor="author-input">Author (optional):</label><br />
                    <input type="text" id="author-input" name="author"></input><br />
                    <input type="submit" value="Submit"></input>
                </form>
            </div>
        </div>
    </div>
}

export default ModalBoardPage