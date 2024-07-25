const generator = require('./generator');
const validator = require('./validator')

/* ===== MODEL ====== */
// Create a class to represent the state of the sudoku game
class Sudoku {
    #board = null;

    // Constructor
    // TODO: Add a way to randomize starting board with RNG 
    constructor () {
        this.#board = new Array(9).fill(0).map(() => new Array(9).fill(0));
    }

    // Getter for the board, return a deep copy
    getBoard () {
        return this.#board.map(row => row.map(square => square));
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

    // Change the number of the square at the specified coordinate
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
        this.#board[row][col] = num;
    }

    // Validate the current board state, returning an object:
    // - gameover: boolean indicating whether the game is over (all squares
    //             have been filled and there are no conflicts)
    // - empty: an array of coordinates [r,c] of unfilled squares
    // - conflict: an array of coordinates [r,c] of conflicting squares
    validate () {
        return validator(this.#board);
    }
}

module.exports = Sudoku;