const Sudoku = require('./sudoku');
const validateBoard = require('./validateBoard');
const solve = require('./greedySolver');

test("sudoku model", () => {
    // Initialize and generate a random board
    const sudoku = new Sudoku();
    sudoku.generateNewBoard(30);

    // Check that the generated board is a valid sudoku board
    const startState = sudoku.getStartState();
    expect(validateBoard(startState)).toBe(true);
    expect(validateBoard(sudoku.getBoard())).toBe(true);

    // Check that the generated board has a solution
    const solutions = solve(startState);
    expect(solutions.length > 0);

    // Check that it's possible to change an empty square
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (startState[row][col] == 0) {
                expect(sudoku.getBoard()[row][col]).toBe(0);
                sudoku.changeSquareAt(row, col, 1);
                expect(sudoku.getBoard()[row][col]).toBe(1);
                sudoku.changeSquareAt(row, col, 0);
                expect(sudoku.getBoard()[row][col]).toBe(0); 
                break;
            }
        }
    }

    // Check that it's not possible to change a starting square
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (startState[row][col] > 0) {
                expect(sudoku.getBoard()[row][col]).toBe(startState[row][col]);
                sudoku.changeSquareAt(row, col, 0);
                expect(sudoku.getBoard()[row][col]).toBe(startState[row][col]); 
                break;
            }
        }
    }
})
