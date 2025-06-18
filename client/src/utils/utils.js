const filterByRecent = (boards) => {
    let tempBoards = [...boards];
    tempBoards.sort((a, b) => b.time_created - a.time_created);
    tempBoards.splice(6);
    return tempBoards;
}

const filterByCategory = (boards, category) => {
    const newBoards = boards.filter(board => 
        board.category === category
    );
    return newBoards;
}

export { filterByRecent, filterByCategory };