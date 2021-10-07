function inputTesting(testName, testNumber, test) {
    if (!test) {
        console.log('%c' + testName, 'color: green;', 'test', testNumber);
        console.warn('  FAIL');
    }
}


let inputCorrectAnwser = 2;
let inputTestingElement = changeCollumn(1, 1);
// will it correctly switch collumn by one to the right
inputTesting('changeCollumn', 1, inputCorrectAnwser == inputTestingElement);

inputCorrectAnwser = 1;
inputTestingElement = changeCollumn(2, -1);
// will it correctly switch collumn by one to the left
inputTesting('changeCollumn', 1, inputCorrectAnwser == inputTestingElement);

inputCorrectAnwser = 1;
inputTestingElement = changeCollumn(1, -1);
// will it not change collumn if it tries to move out of bounds
inputTesting('changeCollumn', 1, inputCorrectAnwser == inputTestingElement);