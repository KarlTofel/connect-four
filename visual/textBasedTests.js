function visualTesting(testName, testNumber, howItLooks, howItShouldLook) {
    if (howItLooks != howItShouldLook) {
        console.log('%c' + testName, 'color: blue;', 'test', testNumber);
        console.warn('  FAIL');
        console.log('%c' + howItLooks, 'background-color: red');
        console.log('%c' + howItShouldLook, 'background-color: green');
    }
}

let howItShouldLook = '0';
let howItLooks = drawColour('yellow');
visualTesting('drawColour', 1, howItLooks, howItShouldLook);

howItShouldLook = '+';
howItLooks = drawColour('red');
visualTesting('drawColour', 2, howItLooks, howItShouldLook);

howItShouldLook = '$';
howItLooks = drawColour('green');
visualTesting('drawColour', 3, howItLooks, howItShouldLook);

howItShouldLook = '#';
howItLooks = drawColour('blue');
visualTesting('drawColour', 4, howItLooks, howItShouldLook);

howItShouldLook = ' ';
howItLooks = drawColour(undefined);
visualTesting('drawColour', 5, howItLooks, howItShouldLook);


howItShouldLook = '[ ][ ][ ][ ][ ][ ][ ]';
howItLooks = drawOneRow(7, 1, []);
visualTesting('drawOneRow', 1, howItLooks, howItShouldLook);

howItShouldLook = '[ ][ ][+][0][ ][ ][$]';
howItLooks = drawOneRow(7, 1, [puck(1, 4, 'yellow'), puck(3, 1, 'red'), puck(4, 1, 'yellow'), puck(7, 1, 'green')]);
visualTesting('drawOneRow', 2, howItLooks, howItShouldLook);

howItShouldLook = ' 0                   ';
howItLooks = drawCollumnSelection(7, 1, 'yellow');
visualTesting('drawCollumnSelection', 1, howItLooks, howItShouldLook);

howItShouldLook = ' +       \n[ ][ ][ ]\n[ ][ ][ ]\n[ ][0][ ]';
howItLooks = drawGame(3, 3, [puck(2, 1, 'yellow')], 1, 'red');
// will it draw a three by three board with one yellow puck dropped and a red one over collumn 1
visualTesting('drawGame', 1, howItLooks, howItShouldLook);