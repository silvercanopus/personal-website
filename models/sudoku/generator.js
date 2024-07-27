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

// This function generates a random unfinished sudoku board that 
// is guaranteed to have a unique solution.
// Arguments:
// - minStartSquares: Specify the number of filled squares in 
// the starting board, which is a measure of difficulty. The
// function will try to reach this target number as close as 
// possible while maintaining the unique solution.
// Returns: object
// {
//   'startState': 9x9 array representing the initial state of the board
//   'endState': 9x9 array representing the unique solution
// }
const generate = function (minStartSquares = 0) {
    const state = new Array(9).fill(0).map(() => new Array(9).fill(0));

    // Step 1: Starting with an empty board, randomly add numbers
    // until it has only one unique solution
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    
    // Step 1a: Create an array of indices
    const indices = [];
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            indices.push([r, c]);
        }
    }

    // Step 1b: Shuffle the indices
    shuffle(indices);

    // Step 1c: Add random numbers one index at a time
    let uniqueSolutionFound = false;
    for (const [row, col] of indices) {
        shuffle(numbers);
        for (const num of numbers) {
            // Try this number
            state[row][col] = num;
            // check for a solution
            const solutions = solver(state);
            if (solutions.length == 0) {
                // no solution found, revert
                state[row][col] = 0;
            }
            else {
                if (solutions.length == 1) {
                    // unique solution found
                    uniqueSolutionFound = true;
                }
                break;
            }
        }
        if (uniqueSolutionFound) {
            break;
        }
    }

    // Step 2: Store the unique solution
    const solutions = solver(state);
    const startState = solutions[0].map(row => row.map(square => square));
    const endState = solutions[0].map(row => row.map(square => square));

    // Step 3: Starting from the solution, randomly remove numbers
    // until the target number of starting squares is reached,
    // while maintaining the uniqueness of the solution
    shuffle(indices);
    let remainingSquares = indices.length;
    for (const [row, col] of indices) {
        if (remainingSquares <= minStartSquares) {
            break;
        }
        // try removing the current square
        const num = startState[row][col];
        startState[row][col] = 0;
        const solutions = solver(startState);
        if (solutions.length != 1) {
            // no longer has unique solution, revert
            startState[row][col] = num;
        }
        else {
            remainingSquares--;
        }
    }

    // Return the starting board and the solution
    return { startState, endState };
}

module.exports = generate;