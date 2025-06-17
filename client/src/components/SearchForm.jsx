import "../styles/SearchForm.css"
const SearchForm = ({searchRequest, onSearchChange, onSubmitSearch}) => {

    const handleSubmit = (event) => {
        event.preventDefault();
        let submitEvent = event.nativeEvent.submitter.getAttribute("name"); 
        if (submitEvent === "search") {
            const formData = new FormData(event.target);
            const newSearchQuery = formData.get('board-name');
            //include???
            // if (newSearchQuery == '') {
            //     setSearchNotif("It seems you haven't searched for anything!");
            // } else {

            //callback in App.jsx that will trigger a search with the query
            onSubmitSearch(newSearchQuery);
        } else if (submitEvent === "clear") {
            onSubmitSearch('');
            event.target.reset();
        }
    }

    //called when text is changed as user is typing
    const handleSearchChange = (event) => {
        //call onSearchChange in App.jsx that will alter the searchRequest state variable while it changes
            //this is necessary to keep the form as a controlled component
        onSearchChange(event.target.value); 
    }

    return (<form className="search-form" onSubmit={handleSubmit}>
        <input type="text" id="text-input" name="board-name" placeholder="Search boards..." onChange={handleSearchChange} value={searchRequest}/>
        <input type="submit" name="search" value="Search" />
        <input type="submit" name="clear" value="Clear" />
     </form>);
}

export default SearchForm;