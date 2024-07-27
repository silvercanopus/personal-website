// Naive sudoku solver that returns an array of valid solutions from
// the given board state. The solver will stop after two solutions
// have been found.
const solve = function (board) {
    const solutions = [];

    // Recursive solver
    const solver = function (board, row, col) {
        // Stop recursion if multiple solutions have been found
        if (solutions.length >= 2) {
            return false;
        }
    
        if (col >= 9) {
            // Move to the next row
            return solver(board, row+1, 0, solutions);
        }
        if (row >= 9) {
            // Board has been successfully filled
            // Create a copy of the solution
            solutions.push(board.map(row => row.map(square => square)));
            return true;
        }
        
        if (board[row][col] != 0) {
            // Square is already filled, move on
            return solver(board, row, col+1);
        }
        else {
            let solutionFound = false;
            for (let num = 1; num <= 9; num++) {
                // Check if this number is a valid candidate
                let valid = true;
    
                // Check for conflict on row
                for (let r = 0; r < 9; r++) {
                    if (board[r][col] == num) {
                        valid = false;
                        break;
                    }
                }
                if (!valid) {
                    continue;
                }
    
                // Check for conflict on column
                for (let c = 0; c < 9; c++) {
                    if (board[row][c] == num) {
                        valid = false;
                        break;
                    }
                }
                if (!valid) {
                    continue;
                }
    
                // Check for conflict on 3x3 section
                const i = Math.floor(row / 3) * 3;
                const j = Math.floor(col / 3) * 3;
                for (let r = i; r < i+3; r++) {
                    for (let c = j; c < j+3; c++) {
                        if (board[r][c] == num) {
                            valid = false;
                            break;
                        }
                    }
                }
                if (!valid) {
                    continue;
                }
    
                // If this point is reached, the number is valid
                board[row][col] = num;
                solutionFound = solver(board, row, col+1) || solutionFound;
                board[row][col] = 0;
            }
            return solutionFound;
        }
    }

    solver(board, 0, 0);

    return solutions;
}

module.exports = solve;