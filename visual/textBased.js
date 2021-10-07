function drawColour(colour) {
    if (colour == 'yellow') {
        return '0'
    } else if (colour == 'red') {
        return '+'
    } else if (colour == 'blue') {
        return '#'
    } else if (colour == 'green') {
        return '$'
    } else {
        return ' '
    }
}


function drawOneRow(collumns, thisRow, pucks) {
    const thisRowOfPucks = pucks.filter(puck => puck.row == thisRow);
    let row = new String;
    for (let i = 1; i <= collumns; i++) {
        const thisCell = thisRowOfPucks.find(puck => puck.collumn == i);
        if (thisCell) {
            row+= '[' + drawColour(thisCell.colour) + ']';
        } else {
            row+= '[ ]';
        }
    }
    return row;
}

function drawCollumnSelection(collumns, selectedCollumn, colour) {
    let row = new String;
    for (let i = 1; i <= collumns; i++) {
        if (i == selectedCollumn) {
            row+= ' ' + drawColour(colour) + ' ';
        } else {
            row+= '   ';
        }
    }
    return row;
}

function drawGame(collumns, rows, pucks, selectedCollumn, colour) {
    let board = drawCollumnSelection(collumns, selectedCollumn, colour);
    for (let i = rows; i > 0; i--) {
        board+= '\n' + drawOneRow(collumns, i, pucks);
    }
    return board;
}