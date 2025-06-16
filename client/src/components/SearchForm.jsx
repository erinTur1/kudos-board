import "../styles/SearchForm.css"
const SearchForm = () => {

    const handleSubmit = () => {
        console.log("button clicked");
    }

    const handleSearchChange = (event) => {
        console.log(event.target.value)
    }

    return (<form className="search-form" onSubmit={handleSubmit}>
        <input type="text" id="text-input" name="board-name" placeholder="Search boards..." onChange={handleSearchChange} value=""/>
        <input type="submit" name="search" value="Search" />
        <input type="submit" name="clear" value="Clear" />
     </form>);
}

export default SearchForm;