const Sudoku = require('../../models/sudoku/sudoku');

/* ===== CONTROLLER ====== */
const sudoku = new Sudoku();
let focus = null;
let gameover = false;
let changeHistory = [];

// Get a reference for the page element
const page = document.querySelector('body');

// Get a reference for the overlay element
const overlay = document.querySelector('.sudoku-board-overlay');

// Get a reference for the side board
const sideboard = document.querySelector('.sudoku-sideboard');

// Get a reference for each of the square elements
const squareElements = [...document.querySelectorAll('.sudoku-square')];
const squares = [];
while (squareElements.length) {
    squares.push(squareElements.splice(0, 9));
}

// Get a reference for the difficulty radio buttons
const difficultyOptions = {
    "easy": {
        "element": document.querySelector('#difficulty-easy'),
        "startingSquares": 45
    },
    "medium": {
        "element": document.querySelector('#difficulty-medium'),
        "startingSquares": 33
    },
    "hard": {
        "element": document.querySelector('#difficulty-hard'),
        "startingSquares": 20
    }
}

// Get a reference for the highlight options
const highlightSameNumbers = document.querySelector('#same-numbers-checkbox');
const highlightConflictingNumbers = document.querySelector('#conflicting-numbers-checkbox');

// Function for getting selected difficulty level
function getDifficulty() {
    for (const difficulty in difficultyOptions) {
        if (difficultyOptions[difficulty].element.checked) {
            return difficulty;
        }
    }
    // default option
    return "medium";
}

// Function for adding an overlay on top of the board when it's being generated
function addLoadingOverlay() {
    overlay.innerText = "Generating a sudoku board..."
    overlay.classList.add('loading-overlay');
}

// Function for adding an overlay on top of the board when it's fully completed
function addVictoryOverlay() {
    overlay.innerText = "Board Complete!"
    overlay.classList.add('victory-overlay');
}

// Function for removing any overlay
function removeOverlay() {
    overlay.innerText = "";
    overlay.classList.remove('loading-overlay');
    overlay.classList.remove('victory-overlay');
}

// Function for starting a new game
function newGame() {
    // Reset any existing overlay
    removeOverlay();

    // Add a loading overlay until a new board has been generated
    addLoadingOverlay();

    // Initialize with a random board
    sudoku.generateNewBoard(difficultyOptions[getDifficulty()].startingSquares);

    // Add a special class for the starting squares
    const startState = sudoku.getStartState();
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            squares[row][col].classList.remove('starting-square');
            if (startState[row][col] > 0) {
                squares[row][col].classList.add('starting-square');
            }
        }
    }

    // Reset focus
    focus = null;

    // Reset gameOver state
    gameover = false;

    // Reset change history
    changeHistory = [];

    // Remove the loading overlay
    removeOverlay();

    // Render the new game state
    render();
}

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
            // Reset all highlights
            squares[r][c].classList.remove('focused');
            squares[r][c].classList.remove('conflict');
            squares[r][c].classList.remove('highlight-same');
        }
    }

    // Add focus indicator
    if (focus) {
        let [r, c] = focus;
        squares[r][c].classList.add('focused');
    }

    // If option is selected, highlight conflicting squares
    if (highlightConflictingNumbers.checked) {
        for (const [r, c] of val.conflict) {
            squares[r][c].classList.add('conflict');
        }
    }

    // If option is selected, highlight other squares with same number as the 
    // currently focused square
    if (highlightSameNumbers.checked) {
        if (focus && sudoku.getSquareAt(...focus) > 0) {
            for (let row = 0; row < 9; row++) {
                for (let col = 0; col < 9; col++) {
                    if (sudoku.getSquareAt(row, col) == sudoku.getSquareAt(...focus)) {
                        squares[row][col].classList.add('highlight-same');
                    }
                }
            }
        }
    }

    // If the board has been successfully completed
    if (!gameover && val.gameover) {
        gameover = true;
        addVictoryOverlay();
    }
}

// Function to change the number of the currently focused square
function changeFocusedSquare(num) {
    if (focus) {
        // Change the square
        const prevNum = sudoku.getSquareAt(...focus);
        const success = sudoku.changeSquareAt(...focus, num);
        
        if (success) {
            // Add to history so this action can be undone later
            changeHistory.push({
                square: [...focus],
                from: prevNum,
                to: num
            })

            // Re-render
            render();
        }
    }
}

// Function to revert latest changes (undo)
function undo() {
    if (changeHistory.length > 0) {
        const lastChange = changeHistory.pop();
        sudoku.changeSquareAt(...lastChange.square, lastChange.from);
        render();
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
        changeFocusedSquare(Number.parseInt(keyName));
    }
    
    // Valid keys for deletion
    else if (keyName == "Backspace" || keyName == "Delete" || keyName == " ") {
        changeFocusedSquare(0);
    }

    // Undo command
    else if (event.ctrlKey && keyName == "z") {
        undo();
    }
});

// Get a reference for the number keys (for input via clicking)
const numberButtons = [...document.querySelectorAll('.sudoku-number-button')];

// Add click event to the number buttons
for (let i = 0; i < 9; i++) {
    numberButtons[i].addEventListener('click', (event) => {
        changeFocusedSquare(i+1);
        event.stopPropagation();
    });
}

// Prevent click events on side board to propagate upward
sideboard.addEventListener('click', (event) => {
    event.stopPropagation();
})

// Get a reference for the menu buttons
const newGameButton = document.querySelector('#sudoku-new-game-button');

// Add click event for the new game button
newGameButton.addEventListener('click', (event) => {
    newGame();
})

// Add onchange event for the highlight options
highlightSameNumbers.addEventListener('change', (event) => {
    render();
})
highlightConflictingNumbers.addEventListener('change', (event) => {
    render();
})

// Start the game
newGame();