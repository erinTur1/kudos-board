import { useState, Suspense } from 'react';
import "../styles/ModalCardPage.css"
import "../styles/Modal.css"

//for modal that pops up when you create a new card
const ModalCardPage = ({ boardId, closeModal, appendNewCard }) => {

    const [gifQuery, setGifQuery] = useState(''); //user search input for gifs
    const [gifUrls, setGifUrls] = useState([]); //resulting gif url options
    const [selectedGifUrl, setSelectedGifUrl] = useState(null); //chosen gif url
    const [gifsResultNotif, setGifsResultNotif] = useState('Gif results will show up here!');

    const postCard = (newCardTitle, newCardMessage, newCardGifUrl, newCardAuthor) => {
        fetch(`${import.meta.env.VITE_DEPLOYED_URL}/boards/${boardId}/cards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "title": newCardTitle,
                "message": newCardMessage,
                "gif_url": newCardGifUrl,
                "author": newCardAuthor,
                "numVotes": 0,
				"isPinned": false
            }),
        })
        .then(async(response) => { 
            if (!response.ok) {
                throw new Error ('Failed to create card')
            } else {
                const newCard = await response.json();
                appendNewCard(newCard);
            }
        })
        .catch(error => console.error(error))

    }

    //submission of entire form
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        if (selectedGifUrl === '') {
            alert("Need to search for and select a gif!")
        } else {
            const newCardTitle = formData.get('title');
            const newCardMessage = formData.get('message');
            const newCardGifUrl = selectedGifUrl;
            const newCardAuthor = formData.get('author');

            postCard(newCardTitle, newCardMessage, newCardGifUrl, newCardAuthor);
        }
        
    }

    //use giphy api to search for gif based on user input
    const handleGifSearch = async (event) => {
        event.preventDefault();
        fetch(`https://api.giphy.com/v1/gifs/search?api_key=${import.meta.env.VITE_API_KEY}&q=${gifQuery}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`)
        .then(async(response) => { 
            if (!response.ok) {
                throw new Error ('Failed to search gifs')
            } else {
                const gifObj = await response.json();
                let tempUrlArr = []
                gifObj.data.forEach((gif) => {
                    tempUrlArr.push(gif.images.original.url);
                })
                if (tempUrlArr.length == 0) {
                    setGifsResultNotif('No gifs found!');
                }
                setGifUrls(tempUrlArr); //set list of all gif url liks so that gif options based on the user's query can be displayed
            }
        })
    }

    const handleGifSelect = (url) => {
        setSelectedGifUrl(url);
    }

    return <div className="modal-overlay"> 
        <div className="modal-popup">       
            <div className="modal-content">
                <button className="close-btn" onClick={closeModal}>X</button>
                <form onSubmit={handleSubmit}>
                    <input placeholder="Title..." type="text" id="title-input" name="title" /><br />

                    <input required placeholder="Message (required)..." type="text" id="message" name="message" /><br />

                    <div>
                        <input required placeholder="Search gifs (required)..." type="text" id="gif-search" name="gif-search" value={gifQuery} onChange={(event) => {setGifQuery(event.target.value)}}/>
                        <button type="button" onClick={handleGifSearch}>Search</button>
                    </div>

                    <div className="gif-results-div">
                        {gifUrls.length == 0? <p>{gifsResultNotif}</p> 
                        :<Suspense fallback={<p>Loading...</p>}>
                            {gifUrls.map((url, index) => 
                                <img key={index} className="gif-img" onClick={() => {handleGifSelect(url)}} src={url}/>
                            )}
                        </Suspense> }
                        
                    </div>

                    <p>Selected Gif:</p>
                    <img className="gif-img" src={selectedGifUrl}/><br />

                    <input placeholder="Author..." type="text" id="author-input" name="author" /><br />

                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    </div>
}

export default ModalCardPage;