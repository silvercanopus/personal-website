/* ===== MODEL ====== */
// Create a class to represent the state of the sudoku game
class Sudoku {
    #board = null;
    #focus = null;

    // Constructor
    // TODO: Add a way to randomize starting board with RNG
    constructor () {
        this.#board = new Array(9).fill(new Array(9).fill(0));
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
        this.#board[row][col] = num;
    }

    // Change the number of the focused square
    changeSquare (num) {
        if (!this.#focus) {
            throw Error("No square is being focused on");
        }
        this.changeSquareAt(...this.#focus, num);
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

// Function for rendering the current board state onto the page
function render() {
    const board = sudoku.getBoard();
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            squares[r][c].innerText = board[r][c];
            squares[r][c].classList.remove('focused');
        }
    }

    const focus = sudoku.getFocus();
    if (focus) {
        let [r, c] = focus;
        squares[r][c].classList.add('focused');
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
        // Disable scrolling via arrow keys
        case "ArrowUp": case "ArrowDown": case "ArrowLeft": case "ArrowRight":
            event.preventDefault();
            break;
    }
})

// Define some keyboard events
page.addEventListener('keyup', (event) => {
    const keyName = event.key;
    if (keyName == "ArrowUp" || keyName == "ArrowDown" || keyName == "ArrowLeft" || keyName == "ArrowRight") {
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
});

// First render
render();