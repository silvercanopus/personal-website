const { performance } = require('perf_hooks');
const naiveSolver = require('./naiveSolver');
const greedySolver = require('./greedySolver');

// Initialize the sudoku board
const board = [
    [0, 0, 0, 9, 0, 4, 6, 8, 0],
    [5, 9, 0, 0, 0, 0, 0, 3, 0],
    [7, 0, 0, 0, 0, 0, 0, 0, 9],
    [4, 2, 0, 3, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 6, 0, 0, 0],
    [0, 0, 3, 4, 0, 2, 1, 0, 0],
    [8, 7, 1, 0, 0, 0, 0, 0, 6],
    [0, 0, 0, 6, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 4, 0, 0]
];

// Measure performance of naive solver
let startTime = performance.now();
let {solvable, solutions} = naiveSolver(board);
let endTime = performance.now();
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