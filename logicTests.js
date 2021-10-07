function compareElements(element1, element2) {
    // stringifies elements (i don't have to loop trough properties to match them)
    return JSON.stringify(element1) == JSON.stringify(element2);
}
function runTest(correctAnwser, testingElement, test, testName, testNumber) {
    console.log(testName, 'TEST', testNumber);
    if (test) {
        console.log('   PASS');
    } else {
        console.warn('   FAIL');
        console.log('       Should be:', correctAnwser, 'but is instead', testingElement);
    }
}


let correctAnwser2 = [puck(1, 1, 'white')];
let testingElement2 = addPuckToRow([], 1, 'white');
// adding a puck to a collumn should put it to the bottom-most available row (which is by deafault row: 1)
runTest(correctAnwser2, testingElement2, compareElements(correctAnwser2, testingElement2), 'addPuckToRow', 1);

testingElement2 = addPuckToRow(correctAnwser2, 1, 'white');
correctAnwser2.push(puck(1, 2, 'white'));
// adding another puck to the row should place it in the row above the prevous puck
runTest(correctAnwser2, testingElement2, compareElements(correctAnwser2, testingElement2), 'addPuckToRow', 2);

testingElement2 = addPuckToRow(correctAnwser2, 1, 'white', 2);
// you should not be able to add another puck to the collumn if all the rows are already filled (default highest row = 6)
runTest(correctAnwser2, testingElement2, compareElements(correctAnwser2, testingElement2), 'addPuckToRow', 3);

testingElement2 = addPuckToRow(correctAnwser2, 2, 'white', 2);
correctAnwser2.push(puck(2, 1, 'white'));
// is it able to add puck to a different collumn
runTest(correctAnwser2, testingElement2, compareElements(correctAnwser2, testingElement2), 'addPuckToRow', 4);

testingElement2 = addPuckToRow(correctAnwser2, 3, 'white', 2, 2);
// you should not be able to add pucks to a collumn to a row which does not exist (default number of colummns = 7)
runTest(correctAnwser2, testingElement2, compareElements(correctAnwser2, testingElement2), 'addPuckToRow', 5);

let testArrayOfPucks = [
    puck(1, 1, 'yellow'),
    puck(2, 1, 'yellow'),
    puck(3, 1, 'yellow'),
    puck(4, 1, 'yellow'),
]
let testingElement3 = doesSpotMakeARowOfXPucks(testArrayOfPucks, 1, 1);
// can it detect if there are 4 pucks to the right of selected spot
runTest(true, testingElement3, testingElement3, '4 in a row', 1);

testingElement3 = doesSpotMakeARowOfXPucks(testArrayOfPucks, 4, 1);
// now the same but to the left
runTest(true, testingElement3, testingElement3, '4 in a row', 2);

testingElement3 = doesSpotMakeARowOfXPucks(testArrayOfPucks, 3, 1);
// now if the puck is in the middle
runTest(true, testingElement3, testingElement3, '4 in a row', 3);

testArrayOfPucks = [
    puck(1, 1, 'yellow'),
    puck(1, 2, 'yellow'),
    puck(1, 3, 'yellow'),
    puck(1, 4, 'yellow'),
]
testingElement3 = doesSpotMakeARowOfXPucks(testArrayOfPucks, 1, 1);
// now if the row is vertical
runTest(true, testingElement3, testingElement3, '4 in a row', 4);

testArrayOfPucks = [
    puck(1, 1, 'yellow'),
    puck(2, 2, 'yellow'),
    puck(3, 3, 'yellow'),
    puck(4, 4, 'yellow'),
]
// now if the row is left-bottom to right-top
runTest(true, testingElement3, testingElement3, '4 in a row', 5);

testArrayOfPucks = [
    puck(1, 4, 'yellow'),
    puck(2, 3, 'yellow'),
    puck(3, 2, 'yellow'),
    puck(4, 1, 'yellow'),
]
testingElement3 = doesSpotMakeARowOfXPucks(testArrayOfPucks, 1, 4);
// now if the row is right-bottom to left-top
runTest(true, testingElement3, testingElement3, '4 in a row', 6);

testArrayOfPucks = [
    puck(1, 1, 'yellow'),
    puck(2, 1, 'yellow'),
    puck(3, 1, 'yellow'),
]
testingElement3 = doesSpotMakeARowOfXPucks(testArrayOfPucks, 1, 1);
// does it care about the right length
runTest(false, testingElement3, !testingElement3, '4 in a row', 7);

testArrayOfPucks = [
    puck(1, 1, 'yellow'),
    puck(2, 1, 'yellow'),
    puck(3, 1, 'red'),
    puck(4, 1, 'yellow'),
]
testingElement3 = doesSpotMakeARowOfXPucks(testArrayOfPucks, 1, 1);
// does it care about appropriate matching colour
runTest(false, testingElement3, !testingElement3, '4 in a row', 8);

testingElement3 = doesSpotMakeARowOfXPucks(testArrayOfPucks, 1, 1, 2);
// can I designate a custom length of 2
runTest(true, testingElement3, testingElement3, '2 in a row', 8);

testArrayOfPucks = [
    puck(1, 1, 'yellow'),
    puck(2, 1, 'yellow'),
    puck(3, 1, 'yellow'),
    puck(4, 1, 'yellow'),
    puck(5, 1, 'yellow'),
    puck(6, 1, 'yellow'),
    puck(7, 1, 'yellow'),
]
testingElement3 = doesSpotMakeARowOfXPucks(testArrayOfPucks, 3, 1, 7);
// can I designate a custom length of 7
runTest(true, testingElement3, testingElement3, '7 in a row', 9);

let testPlayersArray = ['yellow', 'red'];
let correctAnwser5 = 'red';
let testingElement5 = changeTurn(testPlayersArray, testPlayersArray[0]);
// will it correctly cycle up from array[0] to array[1]
runTest(correctAnwser5, testingElement5, correctAnwser5 == testingElement5, 'changeTurn', 1);

correctAnwser5 = 'yellow';
// will it correctly cycle up from array[1] to array[0]
testingElement5 = changeTurn(testPlayersArray, testPlayersArray[1]);
runTest(correctAnwser5, testingElement5, correctAnwser5 == testingElement5, 'changeTurn', 2);

let testingElement6 = theWinnerIs(testArrayOfPucks);
// just changes the victor value to the colour of the winning player
runTest('yellow', testingElement6, 'yellow' == testingElement6, 'declareWinner', 1);

testArrayOfPucks = [
    puck(1, 1, 'yellow'),
    puck(2, 1, 'yellow'),
    puck(3, 1, 'yellow'),
    puck(4, 1, 'Blue'),
    puck(5, 1, 'yellow'),
    puck(6, 1, 'yellow'),
    puck(7, 1, 'yellow'),
]
testingElement6 = theWinnerIs(testArrayOfPucks);
// will it correctly return the winner as 'none'
runTest('none', testingElement6, 'none' == testingElement6, 'declareWinner', 2);

testingElement6 = theWinnerIs(testArrayOfPucks, 3);
// will it take the winner of a custom length
runTest('yellow', testingElement6, 'yellow' == testingElement6, 'declareWinner', 3);

testArrayOfPucks = [
    puck(1, 1, 'blue'),
    puck(2, 1, 'blue'),
    puck(3, 1, 'blue'),
    puck(4, 1, 'blue'),
    puck(5, 1, 'yellow'),
    puck(6, 1, 'yellow'),
    puck(7, 1, 'yellow'),
]
testingElement6 = theWinnerIs(testArrayOfPucks, 4, true);
// how about if the winning puck is not the last in the array
runTest('blue', testingElement6, 'blue' == testingElement6, 'declareWinner', 4);

let correctAnwser7 = gameState([puck(4, 1, 'yellow')], ['yellow', 'red'], 'red');
let testingElement7 = takeTurn(gameState(), 4);
// will it return an appropriate gameState after taking a turn
runTest(correctAnwser7, testingElement7, compareElements(correctAnwser7, testingElement7), 'takeTurn', 1);

correctAnwser7 = gameState([puck(4, 1, 'yellow')], ['yellow', 'red'], 'red', 'red');
testingElement7 = takeTurn(gameState([puck(4, 1, 'yellow')], ['yellow', 'red'], 'red', 'red'), 4);
// if there is a winner, will it correctly return the unchanged gameState
runTest(correctAnwser7, testingElement7, compareElements(correctAnwser7, testingElement7), 'takeTurn', 2);

correctAnwser7 = gameState();
testingElement7 = takeTurn(gameState(), 9);
// if the puck isn't placed, will it return the unchanged gameState
runTest(correctAnwser7, testingElement7, compareElements(correctAnwser7, testingElement7), 'takeTurn', 3);