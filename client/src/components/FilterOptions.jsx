import "../styles/FilterOptions.css"
const FilterOptions = ({ filterBoards }) => {

    const handleFilterClick = (event) => {
        filterBoards(event.target.value)
    }

    return (
        <div className="filter-buttons">
            {/* clean up?  - enums???*/}
            <button value="all" onClick={handleFilterClick}>All</button>
            <button value="recent" onClick={handleFilterClick}>Recent</button>
            <button value="Celebration" onClick={handleFilterClick}>Celebration</button>
            <button value="Thank you" onClick={handleFilterClick}>Thank you</button>
            <button value="Inspiration" onClick={handleFilterClick}>Inspiration</button>
        </div>
    )

}


export default FilterOptions;