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