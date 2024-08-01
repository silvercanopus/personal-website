const validateBoard = require('./validateBoard');

test("validateBoard correctness", () => {
    // Try passing non-array values
    expect(validateBoard(0)).toBe(false);
    expect(validateBoard("board")).toBe(false);
    
    // Try passing arrays with the wrong dimensions
    expect(validateBoard([])).toBe(false);
    expect(validateBoard([1, 2, 3, 4, 5, 6, 7, 8, 9])).toBe(false);
    expect(validateBoard([[1, 2, 3, 4, 5, 6, 7, 8, 9]])).toBe(false);
    expect(validateBoard(new Array(9).fill(0).map(() => new Array(10).fill(0)))).toBe(false);

    // Try passing a board with invalid square numbers
    expect(validateBoard(new Array(9).fill(0).map(() => new Array(9).fill(-1)))).toBe(false);

    // Try passing a valid board
    expect(validateBoard(new Array(9).fill(0).map(() => new Array(9).fill(0)))).toBe(true);
})