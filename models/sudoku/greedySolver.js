const dependencies = require('./boardDependencies');

// Greedy sudoku solver that returns an array of valid solutions from
// the given board state. The solver will stop after two solutions
// have been found.
const solve = function (board) {
    // Array to store found solutions
    const solutions = [];

    // Array to store valid number options
    const options = new Array(9).fill(0).map(() => new Array(9).fill(0).map(() => new Set()));
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (board[r][c] != 0) {
                options[r][c].add(board[r][c]);
                // Check for conflicts among starting squares
                for (let [rr, cc] of dependencies[r][c]) {
                    if (board[rr][cc] == board[r][c]) {
                        // Conflict found
                        return solutions;
                    }
                }
            }
            else {
                for (let num = 1; num <= 9; num++) {
                    let valid = true;
                    for (let [rr, cc] of dependencies[r][c]) {
                        if (board[rr][cc] == num) {
                            valid = false;
                            break;
                        }
                    }
                    if (valid) {
                        options[r][c].add(num);
                    }
                }
            }
        }
    }

    // Recursive solver
    const solver = function (board) {
        // Stop recursion if multiple solutions have been found
        if (solutions.length >= 2) {
            return false;
        }
        
        // Choose the square with the least number of options to minimize branching
        let minOptions = 10;
        let chosenSquare = null;
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (board[r][c] == 0) {
                    if (options[r][c].size < minOptions) {
                        minOptions = options[r][c].size;
                        chosenSquare = [r, c];
                    }
                }
            }
        }

        // If no square is chosen, that means all squares have been filled
        if (!chosenSquare) {
            // Store the solution
            solutions.push(board.map(row => row.map(square => square)));
            return true;
        }

        // Otherwise, try each valid number one at a time
        else {
            const [row, col] = chosenSquare;
            let solutionFound = false;
            for (const num of options[row][col].values()) {
                // Try this number
                let valid = true;
                const dependenciesAffected = [];
                board[row][col] = num;
                for (const [r, c] of dependencies[row][col]) {
                    if (board[r][c] == 0 && options[r][c].has(num)) {
                        options[r][c].delete(num);
                        dependenciesAffected.push([r, c]);
                        if (options[r][c].size == 0) {
                            // Invalid board state
                            valid = false;
                            break;
                        }
                    }
                }
                if (valid) {
                    solutionFound = solver(board) || solutionFound;
                }
                for (const [r, c] of dependenciesAffected) {
                    options[r][c].add(num);
                }
                board[row][col] = 0;
            }
            return solutionFound;
        }
    }

    solver(board);
    
    return solutions;
}

module.exports = solve;