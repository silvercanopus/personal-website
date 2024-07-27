// Validates a given sudoku board. A board is valid if it's a 9x9 array
// and it consists only of numbers from 0-9. 
const validate = function (board) {
    if (!Array.isArray(board) || board.length != 9) {
        return false;
    }
    for (const row of board) {
        if (!Array.isArray(row) || row.length != 9) {
            return false;
        }
        for (const item of row) {
            if (typeof(item) != "number") {
                return false;
            }
            else if (item < 0 || item > 9) {
                return false;
            }
        }
    }

    return true;
}

module.exports = validate;