const isValid = require('./validateBoard');

// Given a sudoku board, return an array consisting of all the 
// coordinates of empty squares.
const checkEmpty = function (board, validateBoard = false) {
    if (validateBoard) {
        if (!isValid(board)) {
            throw Error("Board is not valid");
        }
    }

    const empty = [];

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (board[r][c] == 0) {
                empty.push([r, c]);
            }
        }
    }

    return empty;
}

module.exports = checkEmpty;