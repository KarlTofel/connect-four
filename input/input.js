function changeCollumn(currentCollumn, changeBy, mostLeft = 1, mostRight = 7) {
    const newCollumn = currentCollumn + changeBy;
    if (newCollumn > mostRight || newCollumn < mostLeft) {
        return currentCollumn;
    } else {
        return newCollumn;
    }
}

const game = {
    state: gameState(),
    collumn: 4,
};

document.body.addEventListener('keydown', (e) => {
    const code = e.keyCode;
    if (code == 39 || code == 68 || code == 102) {
        // left key, D key, numpad 6
        game.collumn = changeCollumn(game.collumn, 1, 1, game.state.collumns);
    } else if (code == 37 || code == 65 || code == 100) {
        // right key, A key, numpad 4
        game.collumn = changeCollumn(game.collumn, -1, 1, game.state.collumns);
    } else if (code == 32 || code == 13 || code == 101 ||code == 45) {
        // spacebar, enter, numpad 5, insert
        game.state = takeTurn(game.state, game.collumn);
    }
})