const { performance } = require('perf_hooks');
const naiveSolver = require('./naiveSolver');
const greedySolver = require('./greedySolver');
const generator = require('./generator');

// Initialize the sudoku board
// const board = [
//     [0, 0, 0, 9, 0, 4, 6, 8, 0],
//     [5, 9, 0, 0, 0, 0, 0, 3, 0],
//     [7, 0, 0, 0, 0, 0, 0, 0, 9],
//     [4, 2, 0, 3, 0, 0, 0, 0, 0],
//     [0, 1, 0, 0, 0, 6, 0, 0, 0],
//     [0, 0, 3, 4, 0, 2, 1, 0, 0],
//     [8, 7, 1, 0, 0, 0, 0, 0, 6],
//     [0, 0, 0, 6, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 4, 0, 0]
// ];
let startTime = performance.now();
const { startState: board, endState } = generator(30);
let endTime = performance.now();
console.log(`Generator took ${endTime - startTime} milliseconds`)
console.log("Start:", board.map(row => row.toString()));
console.log("End:", endState.map(row => row.toString()));

// Measure performance of naive solver
startTime = performance.now();
let {solvable, solutions} = naiveSolver(board);
endTime = performance.now();
console.log(`Naive solver took ${endTime - startTime} milliseconds`)
console.log("Solution?", solvable);
if (solvable) {
    for (const solution of solutions) {
        console.log(solution.map(row => row.toString()));
    }
}

// Measure performance of greedy solver
startTime = performance.now();
({solvable, solutions} = greedySolver(board));
endTime = performance.now();
console.log(`Greedy solver took ${endTime - startTime} milliseconds`)
console.log("Solution?", solvable);
if (solvable) {
    for (const solution of solutions) {
        console.log(solution.map(row => row.toString()));
    }
}