import "../styles/Modal.css"

const ModalCardPage = ({ boardId, closeModal, appendNewCard }) => {

    const postCard = (newCardTitle, newCardMessage, newCardGifUrl, newCardAuthor) => {
        fetch(`http://localhost:3000/boards/${boardId}/cards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "title": newCardTitle,
                "message": newCardMessage,
                "gif": newCardGifUrl,
                "author": newCardAuthor
            }),
        })
        .then(async(response) => { //QUESTION:is putting async like this ok?
            if (!response.ok) {
                throw new Error ('Failed to create board')
            } else {
                const newCard = await response.json();
                appendNewCard(newCard);
            }
        })
        .catch(error => console.error(error))

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const newCardTitle = formData.get('title');
        const newCardMessage = formData.get('message');
        const newCardGifUrl = formData.get('gif-search');
        const newCardAuthor = formData.get('author');

        postCard(newCardTitle, newCardMessage, newCardGifUrl, newCardAuthor);
        
    }

    return <div className="modal-overlay"> 
        <div className="modal-popup">       
            <div className="modal-content">
                <button onClick={closeModal}>X</button>
                <form onSubmit={handleSubmit}>
                    <input required placeholder="Title..." type="text" id="title-input" name="title" /><br />

                    <input required placeholder="Message..." type="text" id="message" name="message" /><br />

                    <input required placeholder="Search for gifs..." type="text" id="gif-search" name="gif-search" /><br />

                    <input placeholder="Author..." type="text" id="author-input" name="author" /><br />

                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    </div>
}

export default ModalCardPage