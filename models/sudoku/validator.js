// A function to validate a given sudoku board state.
// Returns an object:
// - gameover: boolean indicating whether the game is over (all squares
//             have been filled and there are no conflicts)
// - empty: an array of coordinates [r,c] of unfilled squares
// - conflict: an array of coordinates [r,c] of conflicting squares
const validate = function (board) {
    const res = {
        gameover: false,
        empty: [],
        conflict: []
    };

    // Scan for empty squares
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (board[r][c] == 0) {
                res.empty.push([r, c]);
            }
        }
    }

    // Array and function to help with checking conflicts
    const conflictBoard = new Array(9).fill(0).map(() => new Array(9).fill(false));
    const checkGroup = function(group) {
        // group consists of arrays of [num, row, col]
        const exists = new Array(10).fill(null);
        for (let [num, r, c] of group) {
            if (exists[num]) {
                conflictBoard[r][c] = true;
                conflictBoard[exists[num][0]][exists[num][1]] = true;
            }
            else {
                exists[num] = [r, c];
            }
        }
    }

    // Scan for conflicting squares - rows
    for (let r = 0; r < 9; r++) {
        const group = [];
        for (let c = 0; c < 9; c++) {
            if (board[r][c] != 0) {
                group.push([board[r][c], r, c]);
            }
        }
        checkGroup(group);
    }

    // Scan for conflicting squares - columns
    for (let c = 0; c < 9; c++) {
        const group = [];
        for (let r = 0; r < 9; r++) {
            if (board[r][c] != 0) {
                group.push([board[r][c], r, c]);
            }
        }
        checkGroup(group);
    }

    // Scan for conflicting squares - 3x3 sections
    for (let i = 0; i < 9; i += 3) {
        for (let j = 0; j < 9; j += 3) {
            const group = [];
            for (let r = i; r < i+3; r++) {
                for (let c = j; c < j+3; c++) {
                    if (board[r][c] != 0) {
                        group.push([board[r][c], r, c]);
                    }
                }
            }
            checkGroup(group);
        }
    }

    // Add any conflicting squares to the result array
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (conflictBoard[r][c]) {
                res.conflict.push([r, c]);
            }
        }
    }

    // Game is considered over if there's no empty square and no conflict
    res.gameover = (res.empty.length == 0) && (res.conflict.length == 0);

    return res;
}

module.exports = validate;