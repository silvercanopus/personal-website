const checkEmpty = require('./checkEmpty');
const checkConflict = require('./checkConflict');

// A function to validate a given sudoku board state.
// Returns an object:
// - gameover: boolean indicating whether the game is over (all squares
//             have been filled and there are no conflicts)
// - empty: an array of coordinates [r,c] of unfilled squares
// - conflict: an array of coordinates [r,c] of conflicting squares
const validate = function (board) {
    const res = {
        gameover: false,
        empty: checkEmpty(board),
        conflict: checkConflict(board)
    };

    // Game is considered over if there's no empty square and no conflict
    res.gameover = (res.empty.length == 0) && (res.conflict.length == 0);

    return res;
}

module.exports = validate;