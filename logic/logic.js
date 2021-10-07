const puck = (collumn, row, colour) => {
    return { collumn, row, colour };
}
function addPuckToRow(placedPucks, collumn, puckColour, highestRow = 6, furthestCollumn = 7) {
    const array = placedPucks.slice(); // this creates a copy of the array, so the original is not changed
    if (collumn <= furthestCollumn) {
        const selectedCollumn = placedPucks.filter(puck => puck.collumn == collumn); // selects only pucks within selected collumn
        const topRow = selectedCollumn.length + 1;
        // since you can't have empty spots bellow a puck the highest available row should be the length of all puck in the collumn + 1
        if (topRow <= highestRow) {
            array.push(puck(collumn, topRow, puckColour));
        }
    }
    return array;
}


function findPuckInCollumnAndRow(placedPucks, collumn, row) {
    return placedPucks.filter(puck => puck.collumn == collumn).find(puck => puck.row == row); // finds the selected puck
}
function checkInDirection(placedPucks, chosenPuck, currentLength, collumnDirection, rowDirection) {
    const collumn = chosenPuck.collumn + collumnDirection; // goes through spots in given direction
    const row = chosenPuck.row + rowDirection;
    const newPuck = findPuckInCollumnAndRow(placedPucks, collumn, row);
    if (newPuck) {
        // does it even exist
        if (newPuck.colour == chosenPuck.colour) {
            // is it a matching colour
            return checkInDirection(placedPucks, newPuck, currentLength + 1, collumnDirection, rowDirection); // loops the function while pucks exist
        }
    }
    return currentLength;
}
function pucksInDirection(placedPucks, chosenPuck, collumnDirection, rowDirection) {
    const oneDirection =  1 + checkInDirection(placedPucks, chosenPuck, 0, collumnDirection, rowDirection);  // the one comes from the chosenPuck
    return oneDirection + checkInDirection(placedPucks, chosenPuck, 0, -collumnDirection, -rowDirection); // does the same in the other direction
}
function doesSpotMakeARowOfXPucks(placedPucks, collumn, row, x = 4) {
    const collumnRow = findPuckInCollumnAndRow(placedPucks, collumn, row);
    if (!collumnRow) {
        return false; // if there is no puck in that collumn and row there can be no sequence of x length
    } else {
        const pucksHorizontaly = pucksInDirection(placedPucks, collumnRow, 1, 0); // going only through the collumns is a horizontal direction
        const pucksVerticaly = pucksInDirection(placedPucks, collumnRow, 0, 1);// if we only chnage the rows it will check in a vertical direction
        const pucksDiagonaly1 = pucksInDirection(placedPucks, collumnRow, 1, 1);// 1, 1 will check in a left-bottom to right-top direction
        const pucksDiagonaly2 = pucksInDirection(placedPucks, collumnRow, -1, 1);// -1, 1 will check in a left-top to right-bottom direction
        return pucksHorizontaly >= x || pucksVerticaly >= x || pucksDiagonaly1 >= x || pucksDiagonaly2 >= x;
    }
}


const gameState = (pucks = new Array, players = ['yellow', 'red'], turn = players[0], winner = 'none', collumns = 7, rows = 6, xInARow = 4) => {
    return { pucks, players, turn, winner, collumns, rows, xInARow };
}

function changeTurn(players, currentPlayer) {
    let nextIndex = players.indexOf(currentPlayer) + 1;
    if (nextIndex >= players.length) {
        return players[0];
    } else {
        return players[nextIndex];
    }
}

function theWinnerIs(placedPucks, xInARow = 4, checkAllPucks = false) {
    if (checkAllPucks) { // a bit redundant, but might sometimes it's nice to have the option
        const winningPuck = placedPucks.find(puck => doesSpotMakeARowOfXPucks(placedPucks, puck.collumn, puck.row, xInARow));
        if (winningPuck) {
            // if there is no winner winningPuck will be undefined
            return winningPuck.colour;
        } else {
            return 'none';
        }
    } else {
        const winningPuck = placedPucks.slice(-1)[0]; // this is faster than array[array.length - 1]
        if (doesSpotMakeARowOfXPucks(placedPucks, winningPuck.collumn, winningPuck.row, xInARow)) {
            // if there is no winner winningPuck will be undefined
            return winningPuck.colour;
        } else {
            return 'none';
        }
    }
}

function takeTurn(game, selectedCollumn) {
    const currentLength = game.pucks.length; // if the puck can't be placed the returned array won't any longer
    const newPucks = addPuckToRow(game.pucks, selectedCollumn, game.turn, game.rows, game.collumns);
    if (newPucks.length > currentLength && game.winner == 'none') { // obviously if a winner is already declared no turns can be taken
        return gameState(
            newPucks, 
            game.players,
            changeTurn(game.players, game.turn),
            theWinnerIs(newPucks, game.xInARow),
        );
    } else {
        // if a puck was not placed then a turn was not taken
        return game;
    }
}