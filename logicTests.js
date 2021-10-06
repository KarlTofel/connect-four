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


let correctAnwser = {
    collumn: 1,
    row: 1,
    colour: 'white',
}
let testingElement = puck(1, 1, 'white');
runTest(correctAnwser, testingElement, compareElements(correctAnwser, testingElement), 'createPuck', 1);

testingElement = puck(0, 1, 'white');
// testing if it can detect wrong anwser
runTest(correctAnwser, testingElement, !compareElements(correctAnwser, testingElement), 'createPuck', 2);


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