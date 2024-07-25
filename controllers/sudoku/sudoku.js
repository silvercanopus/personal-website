const Sudoku = require('../../models/sudoku/sudoku');

/* ===== CONTROLLER ====== */
const sudoku = new Sudoku();
let focus = null;

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
                focus = [r, c];
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
    focus = null;
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
        if (focus) {
            let newFocus = [...focus];
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
                focus = newFocus;
                render();
            }
        }
    }

    // Changing number via number keys
    else if (numberKeys.includes(keyName)) {
        if (focus) {
            sudoku.changeSquareAt(...focus, Number.parseInt(keyName));
            render();
        }
    }
    
    // Valid keys for deletion
    else if (keyName == "Backspace" || keyName == "Delete" || keyName == " ") {
        if (focus) {
            sudoku.changeSquareAt(...focus, 0);
            render();
        }
    }
});

// Add click event to the number buttons
for (let i = 0; i < 9; i++) {
    numberButtons[i].addEventListener('click', (event) => {
        if (focus) {
            sudoku.changeSquareAt(...focus, i+1);
            render();
        }
        event.stopPropagation();
    });
}

// First render
render();