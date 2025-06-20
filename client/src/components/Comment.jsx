import "../styles/Comment.css"

const Comment = ({ content, author }) => {
    return (
    <div className="comment">
        <p>{content}</p>
        {!author == "" && <p>Author: {author}</p>}
    </div>)
}

export default Comment;