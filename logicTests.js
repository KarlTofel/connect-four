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