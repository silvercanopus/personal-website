const generator = require('./generator');
const checkEmpty = require('./checkEmpty');
const checkConflict = require('./checkConflict');

/* ===== MODEL ====== */
// Create a class to represent the state of the sudoku game
class Sudoku {
    #board = null;
    #start = null;

    // Constructor that initializes the sudoku game with an empty board
    constructor () {
        this.#start = new Array(9).fill(0).map(() => new Array(9).fill(0));
        this.#board = new Array(9).fill(0).map(() => new Array(9).fill(0));
    }

    // Getter for the board, return a deep copy
    getBoard () {
        return this.#board.map(row => row.map(square => square));
    }

    // Getter for starting state
    getStartState () {
        return this.#start.map(row => row.map(square => square));
    }

    // Checker for square coordinates
    isValidCoordinate (row, col) {
        if (typeof(row) != "number") {
            throw TypeError("'row' argument must be a number");
        }
        if (typeof(col) != "number") {
            throw TypeError("'col' argument must be a number");
        }
        return (row >= 0) && (row < 9) && (col >= 0) && (col < 9);
    }

    // Change the number of the square at the specified coordinate.
    // Can only change a non-starting square.
    // Return true if the change operation is successful, false otherwise.
    changeSquareAt (row, col, num) {
        if (!this.isValidCoordinate(row, col)) {
            throw Error("Invalid square coordinate");
        }
        if (typeof(num) != "number") {
            throw TypeError("'num' argument must be a number");
        }
        if (num < 0 || num > 9) {
            throw Error("'num' argument must be between 0-9");
        }
        if (this.#start[row][col] > 0) {
            // The coordinate is a starting square
            return false
        }
        this.#board[row][col] = num;
        return true;
    }

    // Generate a new random board
    // - minStartSquares: Specify the number of filled squares in 
    // the starting board, which is a measure of difficulty. The
    // function will try to reach this target number as close as 
    // possible while maintaining the unique solution.
    generateNewBoard (minStartSquares = 0) {
        const { startState, endState } = generator(minStartSquares);
        this.#start = startState;
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                this.#board[row][col] = startState[row][col];
            }
        }
    }

    // Validate the current board state, returning an object:
    // - gameover: boolean indicating whether the game is over (all squares
    //             have been filled and there are no conflicts)
    // - empty: an array of coordinates [r,c] of unfilled squares
    // - conflict: an array of coordinates [r,c] of conflicting squares
    validate () {
        const res = {
            gameover: false,    
            empty: checkEmpty(this.#board),
            conflict: checkConflict(this.#board)
        }

        res.gameover = res.empty.length == 0 && res.conflict.length == 0;

        return res;
    }
}

module.exports = Sudoku;