import { useState, useEffect, Suspense } from 'react';
import Comment from "./Comment"
import "../styles/ModalCardComment.css"
import "../styles/Modal.css"

//for modal that pops up to see comments for a card and input for new comment
const ModalCardComment = ({ closeModal, card, boardId }) => {

    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = () => {
        fetch(`http://localhost:3000/boards/${boardId}/cards/${card.id}/comments`)
            .then(response => response.json())
            .then(data => setComments(data))
            .catch(error => console.error('Error fetching comments:', error))

    }

    const handleSubmit = (event) => {

        event.preventDefault();
        const formData = new FormData(event.target);

        const newCommentContent = formData.get('content');
        const newCommentAuthor = formData.get('author');
        event.target.reset();

        postComment(newCommentContent, newCommentAuthor);
    }

    const postComment = (newCommentContent, newCommentAuthor) => {
        fetch(`http://localhost:3000/boards/${boardId}/cards/${card.id}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "content": newCommentContent,
                "author": newCommentAuthor
            }),
        })
        .then(async(response) => {
            if (!response.ok) {
                throw new Error ('Failed to post comment')
            } else {
                const newComment = await response.json();
                setComments([...comments, newComment]);
            }
        })
        .catch(error => console.error(error))

    }



    return <div className="modal-overlay"> 
        <div className="modal-popup">       
            <div className="modal-content">
                <button className="close-btn" onClick={closeModal}>X</button>
                <section className="top-half">
                    <form onSubmit={handleSubmit}>
                        <textarea required placeholder="Enter your comment here (required)..." type="text" id="content-input" name="content"></textarea><br />
                        <label htmlFor="author-input">Author (optional):</label><br />
                        <input type="text" id="author-input" name="author"></input><br />
                        <input type="submit" value="Post"></input>
                    </form>
                    <article className="card-info">
                        <h3>{card.title}</h3>
                        <p>{card.message}</p>
                        <img src={card.gif_url}/>
                        {card.author != "" && <p>Author: {card.author}</p>}
                    </article>  
                </section>
                <section className="comment-section">
                    <p>Comments:</p>
                    <Suspense fallback={<p>Loading...</p>}>
                        {comments.map((comment) => {
                            return <Comment 
                                key={comment.id}
                                content={comment.content}
                                author={comment.author}
                            />
                        })}
                    </Suspense>
                </section>
            </div>
        </div>
    </div>
}

export default ModalCardComment;