const filterByRecent = () => {

}

const filterByCategory = (boards, category) => {
    const newBoards = boards.filter(board => 
        board.category === category
    );
    return newBoards;
}

export { filterByRecent, filterByCategory };