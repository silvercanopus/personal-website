const naiveSolver = require('./naiveSolver');
const greedySolver = require('./greedySolver');
const checkEmpty = require('./checkEmpty');
const checkConflict = require('./checkConflict');

// Define a helper function
function isValidSolution(board, solution) {
    const empty = checkEmpty(solution);
    if (empty.length > 0) {
        return false;
    }

    const conflict = checkConflict(solution);
    if (conflict.length > 0) {
        return false;
    }

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] > 0) {
                if (board[row][col] != solution[row][col]) {
                    return false;
                }
            }
        }
    }

    return true;
}

// Tests to run for each solver
function testSolver (solver) {
    test("solver data type", () => {
        const testBoard = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];

        const solutions = solver(testBoard);

        expect(Array.isArray(solutions)).toBe(true);
        for (const solution of solutions) {
            expect(Array.isArray(solution)).toBe(true);
            expect(solution.length).toBe(9);
            for (const row of solution) {
                expect(Array.isArray(row)).toBe(true);
                expect(row.length).toBe(9);
                for (const num of row) {
                    expect(Number.isInteger(num)).toBe(true);
                    expect(0 <= num && num <= 9).toBe(true);
                }
            }
        }
    });

    test("solver multiple solutions", () => {
        const testBoard = [
            [1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 2, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 3, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 4, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 5, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 6, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 7, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 8, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 9]
        ];

        const solutions = solver(testBoard);

        expect(solutions.length).toBe(2);
        for (const solution of solutions) {
            expect(isValidSolution(testBoard, solution)).toBe(true);
        }
    });

    test("solver unique solution", () => {
        const testBoard = [
            [4, 0, 5, 0, 0, 2, 7, 3, 8],
            [7, 6, 3, 1, 0, 0, 0, 4, 0],
            [0, 0, 0, 0, 0, 0, 0, 5, 0],
            [0, 3, 0, 0, 4, 0, 0, 0, 0],
            [0, 7, 0, 5, 0, 1, 0, 0, 4],
            [0, 4, 0, 8, 0, 0, 1, 0, 0],
            [1, 0, 0, 0, 0, 6, 3, 0, 2],
            [3, 9, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 7, 5, 0, 0, 1, 0]
        ];

        const solutions = solver(testBoard);

        expect(solutions.length).toBe(1);
        for (const solution of solutions) {
            expect(isValidSolution(testBoard, solution)).toBe(true);
        }
    });

    test("solver no solution", () => {
        const testBoard = [
            [4, 0, 5, 0, 0, 2, 7, 3, 8],
            [7, 6, 3, 1, 0, 0, 0, 4, 0],
            [0, 1, 0, 0, 0, 0, 0, 5, 0],
            [0, 3, 0, 0, 4, 0, 0, 0, 0],
            [0, 7, 0, 5, 0, 1, 0, 0, 4],
            [0, 4, 0, 8, 0, 0, 1, 0, 0],
            [1, 0, 0, 0, 0, 6, 3, 0, 2],
            [3, 9, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 7, 5, 0, 0, 1, 0]
        ];

        const solutions = solver(testBoard);

        expect(solutions.length).toBe(0);
    });
}

testSolver(naiveSolver);
testSolver(greedySolver);