import { FilterType } from "../utils/utils"
import "../styles/FilterOptions.css"
const FilterOptions = ({ filterBoards }) => {

    const handleFilterClick = (event) => {
        filterBoards(event.target.value)
    }

    return (
        <div className="filter-buttons">
            <button className="category-btn" value={FilterType.ALL} onClick={handleFilterClick}>All</button>
            <button className="category-btn" value={FilterType.RECENT} onClick={handleFilterClick}>Recent</button>
            <button className="category-btn" value={FilterType.CELEBRATION} onClick={handleFilterClick}>Celebration</button>
            <button className="category-btn" value={FilterType.THANK_YOU} onClick={handleFilterClick}>Thank you</button>
            <button className="category-btn" value={FilterType.INSPIRATION} onClick={handleFilterClick}>Inspiration</button>
        </div>
    )

}


export default FilterOptions;