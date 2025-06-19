import { FilterType } from "../utils/utils"
import "../styles/FilterOptions.css"
const FilterOptions = ({ filterBoards }) => {

    const handleFilterClick = (event) => {
        filterBoards(event.target.value)
    }

    return (
        <div className="filter-buttons">
            <button value={FilterType.ALL} onClick={handleFilterClick}>All</button>
            <button value={FilterType.RECENT} onClick={handleFilterClick}>Recent</button>
            <button value={FilterType.CELEBRATION} onClick={handleFilterClick}>Celebration</button>
            <button value={FilterType.THANK_YOU} onClick={handleFilterClick}>Thank you</button>
            <button value={FilterType.INSPIRATION} onClick={handleFilterClick}>Inspiration</button>
        </div>
    )

}


export default FilterOptions;