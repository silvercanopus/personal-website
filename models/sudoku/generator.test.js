const generate = require('./generator');
const checkEmpty = require('./checkEmpty');
const checkConflict = require('./checkConflict');

const { startState, endState } = generate();

test("generator data type", () => {
    const hasValidType = function(board) {
        expect(Array.isArray(board)).toBe(true);
        expect(board.length).toBe(9);
        for (const row of board) {
            expect(Array.isArray(row)).toBe(true);
            expect(row.length).toBe(9);
            for (const num of row) {
                expect(Number.isInteger(num)).toBe(true);
                expect(0 <= num && num <= 9).toBe(true);
            }
        }
    }
    
    // Test that the starting board and solution both have the correct type
    hasValidType(startState);
    hasValidType(endState);
});

test("generator starting state is a valid board state", () => {
    // Test that the starting board state has no conflict
    expect(checkConflict(startState).length).toBe(0);
})

test("generator solution is a valid solution", () => {
    // Test that the solution is complete and has no conflict
    expect(checkEmpty(endState).length).toBe(0);
    expect(checkConflict(endState).length).toBe(0);
})

test("generator solution corresponds to starting state", () => {
    // Test that the given solution corresponds to the starting state
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (startState[row][col] != 0) {
                expect(startState[row][col]).toBe(endState[row][col]);
            }
        }
    }
});
