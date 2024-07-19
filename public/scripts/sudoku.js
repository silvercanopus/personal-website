/* ===== MODEL ====== */
// Create a class to represent the state of the sudoku game
class Sudoku {
    #board = null;
    #focus = null;

    // Constructor
    // TODO: Add a way to randomize starting board with RNG 
    constructor () {
        this.#board = new Array(9).fill(0).map(() => new Array(9).fill(0));
    }

    // Getter for the board, return a deep copy
    getBoard () {
        return this.#board.map(row => row.map(square => square));
    }

    // Getter for the focused square coordinate, return a deep copy
    getFocus () {
        if (this.#focus) {
            return [...this.#focus];
        }
        return null;
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

    // Switch focus to the specified coordinate
    focus (row, col) {
        if (!this.isValidCoordinate(row, col)) {
            throw Error("Invalid square coordinate");
        }
        this.#focus = [row, col];
    }

    // Remove focus
    unfocus () {
        this.#focus = null;
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

    // Change the number of the focused square
    changeSquare (num) {
        if (!this.#focus) {
            throw Error("No square is being focused on");
        }
        this.changeSquareAt(...this.#focus, num);
    }

    // Validate the current board state, returning an object:
    // - gameover: boolean value indicating whether the game is over or not
    // - empty: array of coordinates whose square is empty
    // - conflict: array of coordinates whose square conflict with another square
    validate () {
        const res = {
            gameover: false,
            empty: [],
            conflict: []
        };

        // Scan for empty squares
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (this.#board[r][c] == 0) {
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
                if (this.#board[r][c] != 0) {
                    group.push([this.#board[r][c], r, c]);
                }
            }
            checkGroup(group);
        }

        // Scan for conflicting squares - columns
        for (let c = 0; c < 9; c++) {
            const group = [];
            for (let r = 0; r < 9; r++) {
                if (this.#board[r][c] != 0) {
                    group.push([this.#board[r][c], r, c]);
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
                        if (this.#board[r][c] != 0) {
                            group.push([this.#board[r][c], r, c]);
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
}

/* ===== CONTROLLER ====== */
const sudoku = new Sudoku();

// Get a reference for the page element
const page = document.querySelector('body');

// Get a reference for each of the square elements
const squareElements = [...document.querySelectorAll('.sudoku-square')];
const squares = [];
while (squareElements.length) {
    squares.push(squareElements.splice(0, 9));
}
const numberButtons = [...document.querySelectorAll('.sudoku-number-button')];

// Function for rendering the current board state onto the page
function render() {
    const board = sudoku.getBoard();
    const val = sudoku.validate();

    // Render the board
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (1 <= board[r][c] && board[r][c] <= 9) {
                squares[r][c].innerText = board[r][c];
            }
            else {
                squares[r][c].innerText = "";
            }
            squares[r][c].classList.remove('focused');
            squares[r][c].classList.remove('conflict');
        }
    }

    // Add focus indicator
    const focus = sudoku.getFocus();
    if (focus) {
        let [r, c] = focus;
        squares[r][c].classList.add('focused');
    }

    // Add conflict indicator
    for (const [r, c] of val.conflict) {
        squares[r][c].classList.add('conflict');
    }
}

// Add click events for switching focus to the clicked square
for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
        squares[r][c].addEventListener('click', (event) => {
            try {
                sudoku.focus(r, c);
                event.stopPropagation();
                render();
            }
            catch (e) {
                console.log(e);
            }
        })
    }
}

// Add click event outside the board that removes focus
page.addEventListener('click', (event) => {
    sudoku.unfocus();
    render();
})

// Disable some default keyboard events
page.addEventListener('keydown', (event) => {
    switch (event.key) {
        // Disable scrolling via keyboard keys
        case "ArrowUp": case "ArrowDown": case "ArrowLeft": case "ArrowRight": case " ":
            event.preventDefault();
            break;
    }
})

// Define some keyboard events
const arrowKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
const numberKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
page.addEventListener('keyup', (event) => {
    const keyName = event.key;
    console.log(keyName);

    // Movement via arrow keys
    if (arrowKeys.includes(keyName)) {
        let newFocus = sudoku.getFocus();
        if (newFocus) {
            switch (keyName) {
                case "ArrowUp": 
                    newFocus[0]--;
                    break;
                case "ArrowDown":
                    newFocus[0]++;
                    break;
                case "ArrowLeft": 
                    newFocus[1]--;
                    break;
                case "ArrowRight": 
                    newFocus[1]++;
                    break;
            }
            if (sudoku.isValidCoordinate(...newFocus)) {
                sudoku.focus(...newFocus);
                render();
            }
        }
    }

    // Changing number via number keys
    else if (numberKeys.includes(keyName)) {
        if (sudoku.getFocus()) {
            sudoku.changeSquare(Number.parseInt(keyName));
            render();
        }
    }
    
    // Valid keys for deletion
    else if (keyName == "Backspace" || keyName == "Delete" || keyName == " ") {
        if (sudoku.getFocus()) {
            sudoku.changeSquare(0);
            render();
        }
    }
});

// Add click event to the number buttons
for (let i = 0; i < 9; i++) {
    numberButtons[i].addEventListener('click', (event) => {
        if (sudoku.getFocus()) {
            sudoku.changeSquare(i+1);
            render();
        }
        event.stopPropagation();
    });
}

// First render
render();