// no idea how i would realy test these
const canvas = function (collumns, rows, height = window.innerHeight * 0.8) {
    // a standard board would have 7 collumns and 6 rows + 1 collumn selection row
    const width = height * collumns / (rows + 1);
    const spotHeight = height / (rows + 1);
    const spotWidth = height / collumns;
    const canvas = document.createElement('canvas');

    canvas.width = width;
    canvas.height = height;

    canvas.spotSide = spotWidth;

    canvas.ctx = canvas.getContext('2d');

    document.body.appendChild(canvas);
    return canvas;
}
function drawGrid(collumns, rows, ctx, spotSide) {
    const rightMost = spotSide * collumns;
    const bottomMost = (rows + 1) * spotSide;
    ctx.beginPath();
    for (let i = spotSide; i < bottomMost; i += spotSide) {
        ctx.moveTo(0, i);
        ctx.lineTo(rightMost, i);
    }
    for (let j = 0; j < rightMost; j += spotSide) {
        ctx.moveTo(j, spotSide);
        ctx.lineTo(j, bottomMost);
    }
    ctx.stroke();
}
function drawPuck(rows, collumn, row, colour, ctx, spotSide) {
    const fromLeft = spotSide * collumn;
    const fromTop = spotSide * (rows - row + 1); // since the top left corner of the canvas is 0, 0 and we also have one empty row at the top
    const spotHalf = spotSide * 0.5;
    ctx.beginPath();
    ctx.arc(fromLeft - spotHalf, fromTop + spotHalf, spotHalf * 0.98, 0, 2 * Math.PI);
    ctx.fillStyle = colour;
    ctx.fill();
}
function drawPucks(rows, pucks, selectedCollumn, turn, ctx, spotSide) {
    pucks.forEach(puck => drawPuck(rows, puck.collumn, puck.row, puck.colour, ctx, spotSide));
    drawPuck(rows, selectedCollumn, rows + 1, turn, ctx, spotSide);
}
function drawGameOnCanvas(collumns, rows, selectedCollumn, turn, pucks, ctx, spotSide) {
    const rightMost = spotSide * collumns;
    const bottomMost = (rows + 1) * spotSide;
    ctx.clearRect(0, 0, rightMost, bottomMost);
    drawGrid(collumns, rows, ctx, spotSide);
    drawPucks(rows, pucks, selectedCollumn, turn, ctx, spotSide);
}