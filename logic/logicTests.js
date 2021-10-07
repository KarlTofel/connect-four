function compareElements(element1, element2) {
    // stringifies elements (i don't have to loop trough properties to match them)
    return JSON.stringify(element1) == JSON.stringify(element2);
}
function runTest(correctAnwser, testingElement, test, testName, testNumber) {
    if (!test) {
        console.log(testName, 'TEST', testNumber);
        console.warn('   FAIL');
        console.log('       Should be:', correctAnwser, 'but is instead', testingElement);
    }
}


let logicCorrectAnwser = [puck(1, 1, 'white')];
let logicTestingElement = addPuckToRow([], 1, 'white');
// adding a puck to a collumn should put it to the bottom-most available row (which is by deafault row: 1)
runTest(logicCorrectAnwser, logicTestingElement, compareElements(logicCorrectAnwser, logicTestingElement), 'addPuckToRow', 1);

logicTestingElement = addPuckToRow(logicCorrectAnwser, 1, 'white');
logicCorrectAnwser.push(puck(1, 2, 'white'));
// adding another puck to the row should place it in the row above the prevous puck
runTest(logicCorrectAnwser, logicTestingElement, compareElements(logicCorrectAnwser, logicTestingElement), 'addPuckToRow', 2);

logicTestingElement = addPuckToRow(logicCorrectAnwser, 1, 'white', 2);
// you should not be able to add another puck to the collumn if all the rows are already filled (default highest row = 6)
runTest(logicCorrectAnwser, logicTestingElement, compareElements(logicCorrectAnwser, logicTestingElement), 'addPuckToRow', 3);

logicTestingElement = addPuckToRow(logicCorrectAnwser, 2, 'white', 2);
logicCorrectAnwser.push(puck(2, 1, 'white'));
// is it able to add puck to a different collumn
runTest(logicCorrectAnwser, logicTestingElement, compareElements(logicCorrectAnwser, logicTestingElement), 'addPuckToRow', 4);

logicTestingElement = addPuckToRow(logicCorrectAnwser, 3, 'white', 2, 2);
// you should not be able to add pucks to a collumn to a row which does not exist (default number of colummns = 7)
runTest(logicCorrectAnwser, logicTestingElement, compareElements(logicCorrectAnwser, logicTestingElement), 'addPuckToRow', 5);

let testArrayOfPucks = [
    puck(1, 1, 'yellow'),
    puck(2, 1, 'yellow'),
    puck(3, 1, 'yellow'),
    puck(4, 1, 'yellow'),
]
logicTestingElement = doesSpotMakeARowOfXPucks(testArrayOfPucks, 1, 1);
// can it detect if there are 4 pucks to the right of selected spot
runTest(true, logicTestingElement, logicTestingElement, '4 in a row', 1);

logicTestingElement = doesSpotMakeARowOfXPucks(testArrayOfPucks, 4, 1);
// now the same but to the left
runTest(true, logicTestingElement, logicTestingElement, '4 in a row', 2);

logicTestingElement = doesSpotMakeARowOfXPucks(testArrayOfPucks, 3, 1);
// now if the puck is in the middle
runTest(true, logicTestingElement, logicTestingElement, '4 in a row', 3);

testArrayOfPucks = [
    puck(1, 1, 'yellow'),
    puck(1, 2, 'yellow'),
    puck(1, 3, 'yellow'),
    puck(1, 4, 'yellow'),
]
logicTestingElement = doesSpotMakeARowOfXPucks(testArrayOfPucks, 1, 1);
// now if the row is vertical
runTest(true, logicTestingElement, logicTestingElement, '4 in a row', 4);

testArrayOfPucks = [
    puck(1, 1, 'yellow'),
    puck(2, 2, 'yellow'),
    puck(3, 3, 'yellow'),
    puck(4, 4, 'yellow'),
]
// now if the row is left-bottom to right-top
runTest(true, logicTestingElement, logicTestingElement, '4 in a row', 5);

testArrayOfPucks = [
    puck(1, 4, 'yellow'),
    puck(2, 3, 'yellow'),
    puck(3, 2, 'yellow'),
    puck(4, 1, 'yellow'),
]
logicTestingElement = doesSpotMakeARowOfXPucks(testArrayOfPucks, 1, 4);
// now if the row is right-bottom to left-top
runTest(true, logicTestingElement, logicTestingElement, '4 in a row', 6);

testArrayOfPucks = [
    puck(1, 1, 'yellow'),
    puck(2, 1, 'yellow'),
    puck(3, 1, 'yellow'),
]
logicTestingElement = doesSpotMakeARowOfXPucks(testArrayOfPucks, 1, 1);
// does it care about the right length
runTest(false, logicTestingElement, !logicTestingElement, '4 in a row', 7);

testArrayOfPucks = [
    puck(1, 1, 'yellow'),
    puck(2, 1, 'yellow'),
    puck(3, 1, 'red'),
    puck(4, 1, 'yellow'),
]
logicTestingElement = doesSpotMakeARowOfXPucks(testArrayOfPucks, 1, 1);
// does it care about appropriate matching colour
runTest(false, logicTestingElement, !logicTestingElement, '4 in a row', 8);

logicTestingElement = doesSpotMakeARowOfXPucks(testArrayOfPucks, 1, 1, 2);
// can I designate a custom length of 2
runTest(true, logicTestingElement, logicTestingElement, '2 in a row', 8);

testArrayOfPucks = [
    puck(1, 1, 'yellow'),
    puck(2, 1, 'yellow'),
    puck(3, 1, 'yellow'),
    puck(4, 1, 'yellow'),
    puck(5, 1, 'yellow'),
    puck(6, 1, 'yellow'),
    puck(7, 1, 'yellow'),
]
logicTestingElement = doesSpotMakeARowOfXPucks(testArrayOfPucks, 3, 1, 7);
// can I designate a custom length of 7
runTest(true, logicTestingElement, logicTestingElement, '7 in a row', 9);

let testPlayersArray = ['yellow', 'red'];
logicCorrectAnwser = 'red';
logicTestingElement = changeTurn(testPlayersArray, testPlayersArray[0]);
// will it correctly cycle up from array[0] to array[1]
runTest(logicCorrectAnwser, logicTestingElement, logicCorrectAnwser == logicTestingElement, 'changeTurn', 1);

logicCorrectAnwser = 'yellow';
// will it correctly cycle up from array[1] to array[0]
logicTestingElement = changeTurn(testPlayersArray, testPlayersArray[1]);
runTest(logicCorrectAnwser, logicTestingElement, logicCorrectAnwser == logicTestingElement, 'changeTurn', 2);

logicTestingElement = theWinnerIs(testArrayOfPucks);
// just changes the victor value to the colour of the winning player
runTest('yellow', logicTestingElement, 'yellow' == logicTestingElement, 'declareWinner', 1);

testArrayOfPucks = [
    puck(1, 1, 'yellow'),
    puck(2, 1, 'yellow'),
    puck(3, 1, 'yellow'),
    puck(4, 1, 'Blue'),
    puck(5, 1, 'yellow'),
    puck(6, 1, 'yellow'),
    puck(7, 1, 'yellow'),
]
logicTestingElement = theWinnerIs(testArrayOfPucks);
// will it correctly return the winner as 'none'
runTest('none', logicTestingElement, 'none' == logicTestingElement, 'declareWinner', 2);

logicTestingElement = theWinnerIs(testArrayOfPucks, 3);
// will it take the winner of a custom length
runTest('yellow', logicTestingElement, 'yellow' == logicTestingElement, 'declareWinner', 3);

testArrayOfPucks = [
    puck(1, 1, 'blue'),
    puck(2, 1, 'blue'),
    puck(3, 1, 'blue'),
    puck(4, 1, 'blue'),
    puck(5, 1, 'yellow'),
    puck(6, 1, 'yellow'),
    puck(7, 1, 'yellow'),
]
logicTestingElement = theWinnerIs(testArrayOfPucks, 4, true);
// how about if the winning puck is not the last in the array
runTest('blue', logicTestingElement, 'blue' == logicTestingElement, 'declareWinner', 4);

logicCorrectAnwser = gameState([puck(4, 1, 'yellow')], ['yellow', 'red'], 'red');
logicTestingElement = takeTurn(gameState(), 4);
// will it return an appropriate gameState after taking a turn
runTest(logicCorrectAnwser, logicTestingElement, compareElements(logicCorrectAnwser, logicTestingElement), 'takeTurn', 1);

logicCorrectAnwser = gameState([puck(4, 1, 'yellow')], ['yellow', 'red'], 'red', 'red');
logicTestingElement = takeTurn(gameState([puck(4, 1, 'yellow')], ['yellow', 'red'], 'red', 'red'), 4);
// if there is a winner, will it correctly return the unchanged gameState
runTest(logicCorrectAnwser, logicTestingElement, compareElements(logicCorrectAnwser, logicTestingElement), 'takeTurn', 2);

logicCorrectAnwser = gameState();
logicTestingElement = takeTurn(gameState(), 9);
// if the puck isn't placed, will it return the unchanged gameState
runTest(logicCorrectAnwser, logicTestingElement, compareElements(logicCorrectAnwser, logicTestingElement), 'takeTurn', 3);