// Use one of the solvers
const solver = require('./greedySolver');

// Helper function to randomly shuffle an array
const shuffle = function (arr) {
    let i = arr.length;
    while (i > 0) {
        let j = Math.floor(Math.random() * i);
        i--;
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

// Helper array that stores all the possible sudoku numbers
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// Helper array that stores all the possible square indices
const indices = [];
for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
        indices.push([r, c]);
    }
}

// This function generates a random unfinished sudoku board that 
// is guaranteed to have at least one solution.
// Arguments:
// - numStartSquares: Specify the number of filled squares in 
// the starting board, which is a measure of difficulty. 
// Returns: object
// {
//   'startState': 9x9 array representing the initial state of the board
//   'endState': 9x9 array representing a solution to the starting state
// }
const generate = function (numStartSquares = 30) {
    let startState = null;
    let endState = null;

    // Step 1: Randomly seed the upper left, middle, and bottom right
    // 3x3 sections with numbers 1-9. These 3 sections are chosen
    // because they are not conflicting with one another.
    let seeded = false;
    while(!seeded) {
        const state = new Array(9).fill(0).map(() => new Array(9).fill(0));
        for (let i = 0; i < 9; i += 3) {
            shuffle(numbers);
            let j = 0;
            for (let row = i; row < i+3; row++) {
                for (let col = i; col < i+3; col++) {
                    state[row][col] = numbers[j];
                    j++;
                }
            }
        }
        const solutions = solver(state);
        if (solutions.length > 0) {
            seeded = true;
            // copy one of the solutions
            startState = solutions[0].map(row => row.map(num => num));
            endState = solutions[0].map(row => row.map(num => num));
        }
    }

    // Step 2: Starting from one of the solutions, randomly remove 
    // numbers until the target number of starting squares is reached.
    shuffle(indices);
    let remainingSquares = indices.length;
    for (const [row, col] of indices) {
        if (remainingSquares <= numStartSquares) {
            break;
        }
        startState[row][col] = 0;
        remainingSquares--;
    }

    // Return the starting board and the solution
    return { startState, endState };
}

module.exports = generate;