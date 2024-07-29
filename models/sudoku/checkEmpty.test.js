const checkEmpty = require('./checkEmpty');

const testBoard = [
    [1, 2, 3, 0, 0, 0, 0, 0, 0],
    [4, 5, 6, 0, 0, 0, 0, 0, 0],
    [7, 8, 9, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 3, 0, 0, 0],
    [0, 0, 0, 4, 5, 6, 0, 0, 0],
    [0, 0, 0, 7, 8, 9, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 2, 3],
    [0, 0, 0, 0, 0, 0, 4, 5, 6],
    [0, 0, 0, 0, 0, 0, 7, 8, 9]
];

const empty = checkEmpty(testBoard);

test("checkEmpty data type", () => {
    // Test that the value returned by the function has the expected type
    expect(Array.isArray(empty)).toBe(true);
    for (const index of empty) {
        expect(Array.isArray(index)).toBe(true);
        expect(index.length).toBe(2);
        for (let i = 0; i < 2; i++) {
            expect(Number.isInteger(index[i])).toBe(true);
            expect(0 <= index[i] && index[i] < 9).toBe(true);
        }
    }
});

test("checkEmpty correctness", () => {
    // Test that all squares returned by the function is actually empty
    for (const [r,c] of empty) {
        expect(testBoard[r][c]).toBe(0);
    }
});

test("checkEmpty completeness", () => {
    // Helper function
    const included = function (x, y) {
        for (const [r,c] of empty) {
            if (x == r && y == c) {
                return true;
            }
        }
        return false;
    }

    // Test that all empty squares actually get returned by the function
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (testBoard[row][col] == 0) {
                expect(included(row, col)).toBe(true);
            }
        }
    }
});