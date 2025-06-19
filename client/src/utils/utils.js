const filterByRecent = (boards) => {
    let tempBoards = [...boards];
    tempBoards.sort((a, b) => b.id - a.id);
    tempBoards.splice(6);
    return tempBoards;
}

const filterByCategory = (boards, category) => {
    const newBoards = boards.filter(board => 
        board.category === category
    );
    return newBoards;
}

//enums for categories
const FilterType = Object.freeze({
    NONE: "" ,
    ALL: "all",
    RECENT: "recent",
    CELEBRATION: "celebration",
    THANK_YOU: "thank you",
    INSPIRATION: "inspiration"

});

export { filterByRecent, filterByCategory, FilterType };