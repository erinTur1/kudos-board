import "../styles/Modal.css"

const Modal = ({ closeModal, appendNewBoard }) => {

    const postBoard = (newBoardTitle, newBoardCategory, newBoardAuthor) => {
        fetch("http://localhost:3000/boards", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "title": newBoardTitle,
                "category": newBoardCategory,
                "author": newBoardAuthor
            }),
        })
        .then(async(response) => { //QUESTION:is putting async like this ok?
            if (!response.ok) {
                throw new Error ('Failed to create board')
            } else {
                const newBoard = await response.json();
                appendNewBoard(newBoard);
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
                <button onClick={closeModal}>X</button>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="titleInput">Title:</label><br />
                    <input required type="text" id="title-input" name="title"></input><br />
                    <label htmlFor="category">Category:</label><br />
                    <select required id="category" name="category" defaultValue="">
                        <option disabled value="">Select a category</option>
                        {/* NEED ENUMS HERE */}
                        <option value="celebration">Celebration</option>
                        <option value="thank-you">Thank you</option>
                        <option value="inspiration">Inspiration</option>
                    </select><br />
                    <label htmlFor="author-input">Author:</label><br />
                    <input type="text" id="author-input" name="author"></input><br />
                    <input type="submit" value="Submit"></input>
                </form>
            </div>
        </div>
    </div>
}

export default Modal