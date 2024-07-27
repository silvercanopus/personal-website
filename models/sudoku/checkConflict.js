const isValid = require('./validateBoard');
const dependencies = require('./boardDependencies');

// Given a sudoku board, return an array consisting of coordinates of
// squares that are conflicting with at least one other square.
const checkConflict = function (board, validateBoard = false) {
    if (validateBoard) {
        if (!isValid(board)) {
            throw Error("Board is not valid");
        }
    }

    const conflict = [];

    // Add any conflicting squares to the result array
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            let hasConflict = false;
            for (let [r,c] of dependencies[row][col]) {
                if (board[row][col] == board[r][c]) {
                    hasConflict = true;
                    break;
                }
            }
            if (hasConflict) {
                conflict.push([row, col]);
            }
        }
    }

    return conflict;
}

module.exports = checkConflict;