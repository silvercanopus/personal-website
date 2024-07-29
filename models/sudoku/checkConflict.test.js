const checkConflict = require('./checkConflict');
const dependencies = require('./boardDependencies');

const testBoard = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [2, 2, 0, 0, 0, 0, 0, 0, 0],
    [3, 0, 3, 0, 0, 0, 0, 0, 0],
    [4, 0, 0, 4, 0, 0, 0, 0, 0],
    [5, 0, 0, 0, 5, 0, 0, 0, 0],
    [6, 0, 0, 0, 0, 6, 0, 0, 0],
    [7, 0, 0, 0, 0, 0, 7, 0, 0],
    [8, 0, 0, 0, 0, 0, 0, 8, 0],
    [9, 0, 0, 0, 0, 0, 0, 0, 9]
];

// Define a helper function
const hasConflict = function (row, col) {
    for (const [r,c] of dependencies[row][col]) {
        if (testBoard[row][col] == testBoard[r][c]) {
            return true;
        }
    }
    return false;
}

const conflict = checkConflict(testBoard);

test("checkConflict data type", () => {
    // Test that the value returned by the function has the expected type
    expect(Array.isArray(conflict)).toBe(true);
    for (const index of conflict) {
        expect(Array.isArray(index)).toBe(true);
        expect(index.length).toBe(2);
        for (let i = 0; i < 2; i++) {
            expect(Number.isInteger(index[i])).toBe(true);
            expect(0 <= index[i] && index[i] < 9).toBe(true);
        }
    }
});

test("checkEmpty correctness", () => {
    // Test that all squares returned by the function is actually in a conflict
    for (const [row, col] of conflict) {
        expect(hasConflict(row, col)).toBe(true);
    }
});

test("checkEmpty completeness", () => {
    // Helper function
    const included = function (x, y) {
        for (const [r,c] of conflict) {
            if (x == r && y == c) {
                return true;
            }
        }
        return false;
    }

    // Test that all conflicting squares actually get returned by the function
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (hasConflict(row, col)) {
                expect(included(row, col)).toBe(true);
            }
        }
    }
});