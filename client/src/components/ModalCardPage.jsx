import { useState } from 'react';
import "../styles/ModalCardPage.css"
import "../styles/Modal.css"

const ModalCardPage = ({ boardId, closeModal, appendNewCard }) => {

    const [gifQuery, setGifQuery] = useState('');
    const [gifUrls, setGifUrls] = useState([]);
    const [selectedGifUrl, setSelectedGifUrl] = useState(null);

    const postCard = (newCardTitle, newCardMessage, newCardGifUrl, newCardAuthor) => {
        fetch(`http://localhost:3000/boards/${boardId}/cards`, {
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

    const handleGifSearch = async (event) => {
        event.preventDefault();
        fetch(`https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${gifQuery}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`)
        .then(async(response) => { 
            if (!response.ok) {
                throw new Error ('Failed to search gifs')
            } else {
                const gifObj = await response.json();
                let tempUrlArr = []
                gifObj.data.forEach((gif) => {
                    tempUrlArr.push(gif.images.original.url);
                })
                setGifUrls(tempUrlArr);
            }
        })
    }

    const handleGifSelect = (url) => {
        setSelectedGifUrl(url);

    }

    return <div className="modal-overlay"> 
        <div className="modal-popup">       
            <div className="modal-content">
                <button onClick={closeModal}>X</button>
                <form onSubmit={handleSubmit}>
                    <input placeholder="Title..." type="text" id="title-input" name="title" /><br />

                    <input required placeholder="Message..." type="text" id="message" name="message" /><br />

                    <div>
                        <input required placeholder="Search for gifs..." type="text" id="gif-search" name="gif-search" value={gifQuery} onChange={(event) => {setGifQuery(event.target.value)}}/>
                        <button type="button" onClick={handleGifSearch}>Search</button>
                    </div>

                    <div className="gif-results-div">
                        {gifUrls.map((url, index) => 
                            <img key={index} className="gif-img" onClick={() => {handleGifSelect(url)}} src={url}/>
                        )}
                    </div>

                    <p>Selected Gif:</p>
                    <img className="gif-img" src={selectedGifUrl}/><br />
                    {/* <input required placeholder="Selected gif url..." type="text" id="gif-url" name="gif-url" value={selectedGifUrl}/><br /> */}

                    <input placeholder="Author..." type="text" id="author-input" name="author" /><br />

                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    </div>
}

export default ModalCardPage;