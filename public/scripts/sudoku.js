/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./controllers/sudoku/sudoku.js":
/*!**************************************!*\
  !*** ./controllers/sudoku/sudoku.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const Sudoku = __webpack_require__(/*! ../../models/sudoku/sudoku */ \"./models/sudoku/sudoku.js\");\r\n\r\n/* ===== CONTROLLER ====== */\r\nconst sudoku = new Sudoku();\r\nlet focus = null;\r\n\r\n// TODO: Expand difficulty setting\r\nconst startingSquaresMedium = 33;\r\n\r\n// Initialize with a random board\r\nsudoku.generateNewBoard(startingSquaresMedium);\r\n\r\n// Get a reference for the page element\r\nconst page = document.querySelector('body');\r\n\r\n// Get a reference for each of the square elements\r\nconst squareElements = [...document.querySelectorAll('.sudoku-square')];\r\nconst squares = [];\r\nwhile (squareElements.length) {\r\n    squares.push(squareElements.splice(0, 9));\r\n}\r\n\r\n// Function for rendering the current board state onto the page\r\nfunction render() {\r\n    const board = sudoku.getBoard();\r\n    const val = sudoku.validate();\r\n\r\n    // Render the board\r\n    for (let r = 0; r < 9; r++) {\r\n        for (let c = 0; c < 9; c++) {\r\n            if (1 <= board[r][c] && board[r][c] <= 9) {\r\n                squares[r][c].innerText = board[r][c];\r\n            }\r\n            else {\r\n                squares[r][c].innerText = \"\";\r\n            }\r\n            squares[r][c].classList.remove('focused');\r\n            squares[r][c].classList.remove('conflict');\r\n        }\r\n    }\r\n\r\n    // Add focus indicator\r\n    if (focus) {\r\n        let [r, c] = focus;\r\n        squares[r][c].classList.add('focused');\r\n    }\r\n\r\n    // Add conflict indicator\r\n    for (const [r, c] of val.conflict) {\r\n        squares[r][c].classList.add('conflict');\r\n    }\r\n}\r\n\r\n// Add click events for switching focus to the clicked square\r\nfor (let r = 0; r < 9; r++) {\r\n    for (let c = 0; c < 9; c++) {\r\n        squares[r][c].addEventListener('click', (event) => {\r\n            try {\r\n                focus = [r, c];\r\n                event.stopPropagation();\r\n                render();\r\n            }\r\n            catch (e) {\r\n                console.log(e);\r\n            }\r\n        })\r\n    }\r\n}\r\n\r\n// Add click event outside the board that removes focus\r\npage.addEventListener('click', (event) => {\r\n    focus = null;\r\n    render();\r\n})\r\n\r\n// Disable some default keyboard events\r\npage.addEventListener('keydown', (event) => {\r\n    switch (event.key) {\r\n        // Disable scrolling via keyboard keys\r\n        case \"ArrowUp\": case \"ArrowDown\": case \"ArrowLeft\": case \"ArrowRight\": case \" \":\r\n            event.preventDefault();\r\n            break;\r\n    }\r\n})\r\n\r\n// Define some keyboard events\r\nconst arrowKeys = [\"ArrowUp\", \"ArrowDown\", \"ArrowLeft\", \"ArrowRight\"];\r\nconst numberKeys = [\"1\", \"2\", \"3\", \"4\", \"5\", \"6\", \"7\", \"8\", \"9\", \"0\"];\r\npage.addEventListener('keyup', (event) => {\r\n    const keyName = event.key;\r\n    console.log(keyName);\r\n\r\n    // Movement via arrow keys\r\n    if (arrowKeys.includes(keyName)) {\r\n        if (focus) {\r\n            let newFocus = [...focus];\r\n            switch (keyName) {\r\n                case \"ArrowUp\": \r\n                    newFocus[0]--;\r\n                    break;\r\n                case \"ArrowDown\":\r\n                    newFocus[0]++;\r\n                    break;\r\n                case \"ArrowLeft\": \r\n                    newFocus[1]--;\r\n                    break;\r\n                case \"ArrowRight\": \r\n                    newFocus[1]++;\r\n                    break;\r\n            }\r\n            if (sudoku.isValidCoordinate(...newFocus)) {\r\n                focus = newFocus;\r\n                render();\r\n            }\r\n        }\r\n    }\r\n\r\n    // Changing number via number keys\r\n    else if (numberKeys.includes(keyName)) {\r\n        if (focus) {\r\n            sudoku.changeSquareAt(...focus, Number.parseInt(keyName));\r\n            render();\r\n        }\r\n    }\r\n    \r\n    // Valid keys for deletion\r\n    else if (keyName == \"Backspace\" || keyName == \"Delete\" || keyName == \" \") {\r\n        if (focus) {\r\n            sudoku.changeSquareAt(...focus, 0);\r\n            render();\r\n        }\r\n    }\r\n});\r\n\r\n// Get a reference for the number keys (for input via clicking)\r\nconst numberButtons = [...document.querySelectorAll('.sudoku-number-button')];\r\n\r\n// Add click event to the number buttons\r\nfor (let i = 0; i < 9; i++) {\r\n    numberButtons[i].addEventListener('click', (event) => {\r\n        if (focus) {\r\n            sudoku.changeSquareAt(...focus, i+1);\r\n            render();\r\n        }\r\n        event.stopPropagation();\r\n    });\r\n}\r\n\r\n// Get a reference for the menu buttons\r\nconst newGameButton = document.querySelector('#sudoku-new-game-button');\r\n\r\n// Add click event for the new game button\r\nnewGameButton.addEventListener('click', (event) => {\r\n    sudoku.generateNewBoard(startingSquaresMedium);\r\n    focus = null;\r\n    render();\r\n    event.stopPropagation();\r\n})\r\n\r\n// First render\r\nrender();\n\n//# sourceURL=webpack://personal-website/./controllers/sudoku/sudoku.js?");

/***/ }),

/***/ "./models/sudoku/boardDependencies.js":
/*!********************************************!*\
  !*** ./models/sudoku/boardDependencies.js ***!
  \********************************************/
/***/ ((module) => {

eval("// Array to store square dependencies (to help with iteration)\r\nconst dependencies = new Array(9).fill(0).map(() => new Array(9).fill(0).map(() => new Array()));\r\nfor (let r = 0; r < 9; r++) {\r\n    for (let c = 0; c < 9; c++) {\r\n        // Same-column dependencies\r\n        for (let rr = 0; rr < 9; rr++) {\r\n            if (r != rr) {\r\n                dependencies[r][c].push([rr, c]);\r\n            }\r\n        }\r\n        // Same-row dependecies\r\n        for (let cc = 0; cc < 9; cc++) {\r\n            if (c != cc) {\r\n                dependencies[r][c].push([r, cc]);\r\n            }\r\n        }\r\n        // 3x3 section dependencies\r\n        let i = Math.floor(r / 3) * 3;\r\n        let j = Math.floor(c / 3) * 3;\r\n        for (let rr = i; rr < i+3; rr++) {\r\n            for (let cc = j; cc < j+3; cc++) {\r\n                if (r != rr && c != cc) {\r\n                    dependencies[r][c].push([rr, cc]);\r\n                }\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\nmodule.exports = dependencies;\n\n//# sourceURL=webpack://personal-website/./models/sudoku/boardDependencies.js?");

/***/ }),

/***/ "./models/sudoku/checkConflict.js":
/*!****************************************!*\
  !*** ./models/sudoku/checkConflict.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const isValid = __webpack_require__(/*! ./validateBoard */ \"./models/sudoku/validateBoard.js\");\r\nconst dependencies = __webpack_require__(/*! ./boardDependencies */ \"./models/sudoku/boardDependencies.js\");\r\n\r\n// Given a sudoku board, return an array consisting of coordinates of\r\n// squares that are conflicting with at least one other square.\r\nconst checkConflict = function (board, validateBoard = false) {\r\n    if (validateBoard) {\r\n        if (!isValid(board)) {\r\n            throw Error(\"Board is not valid\");\r\n        }\r\n    }\r\n\r\n    const conflict = [];\r\n\r\n    // Add any conflicting squares to the result array\r\n    for (let row = 0; row < 9; row++) {\r\n        for (let col = 0; col < 9; col++) {\r\n            if (board[row][col] == 0) {\r\n                continue;\r\n            }\r\n            let hasConflict = false;\r\n            for (let [r,c] of dependencies[row][col]) {\r\n                if (board[row][col] == board[r][c]) {\r\n                    hasConflict = true;\r\n                    break;\r\n                }\r\n            }\r\n            if (hasConflict) {\r\n                conflict.push([row, col]);\r\n            }\r\n        }\r\n    }\r\n\r\n    return conflict;\r\n}\r\n\r\nmodule.exports = checkConflict;\n\n//# sourceURL=webpack://personal-website/./models/sudoku/checkConflict.js?");

/***/ }),

/***/ "./models/sudoku/checkEmpty.js":
/*!*************************************!*\
  !*** ./models/sudoku/checkEmpty.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const isValid = __webpack_require__(/*! ./validateBoard */ \"./models/sudoku/validateBoard.js\");\r\n\r\n// Given a sudoku board, return an array consisting of all the \r\n// coordinates of empty squares.\r\nconst checkEmpty = function (board, validateBoard = false) {\r\n    if (validateBoard) {\r\n        if (!isValid(board)) {\r\n            throw Error(\"Board is not valid\");\r\n        }\r\n    }\r\n\r\n    const empty = [];\r\n\r\n    for (let r = 0; r < 9; r++) {\r\n        for (let c = 0; c < 9; c++) {\r\n            if (board[r][c] == 0) {\r\n                empty.push([r, c]);\r\n            }\r\n        }\r\n    }\r\n\r\n    return empty;\r\n}\r\n\r\nmodule.exports = checkEmpty;\n\n//# sourceURL=webpack://personal-website/./models/sudoku/checkEmpty.js?");

/***/ }),

/***/ "./models/sudoku/generator.js":
/*!************************************!*\
  !*** ./models/sudoku/generator.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// Use one of the solvers\r\nconst solver = __webpack_require__(/*! ./greedySolver */ \"./models/sudoku/greedySolver.js\");\r\n\r\n// Helper function to randomly shuffle an array\r\nconst shuffle = function (arr) {\r\n    let i = arr.length;\r\n    while (i > 0) {\r\n        let j = Math.floor(Math.random() * i);\r\n        i--;\r\n        [arr[i], arr[j]] = [arr[j], arr[i]];\r\n    }\r\n}\r\n\r\n// This function generates a random unfinished sudoku board that \r\n// is guaranteed to have a unique solution.\r\n// Arguments:\r\n// - minStartSquares: Specify the number of filled squares in \r\n// the starting board, which is a measure of difficulty. The\r\n// function will try to reach this target number as close as \r\n// possible while maintaining the unique solution.\r\n// Returns: object\r\n// {\r\n//   'startState': 9x9 array representing the initial state of the board\r\n//   'endState': 9x9 array representing the unique solution\r\n// }\r\nconst generate = function (minStartSquares = 0) {\r\n    const state = new Array(9).fill(0).map(() => new Array(9).fill(0));\r\n\r\n    // Step 1: Starting with an empty board, randomly add numbers\r\n    // until it has only one unique solution\r\n    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];\r\n    \r\n    // Step 1a: Create an array of indices\r\n    const indices = [];\r\n    for (let r = 0; r < 9; r++) {\r\n        for (let c = 0; c < 9; c++) {\r\n            indices.push([r, c]);\r\n        }\r\n    }\r\n\r\n    // Step 1b: Shuffle the indices\r\n    shuffle(indices);\r\n\r\n    // Step 1c: Add random numbers one index at a time\r\n    let uniqueSolutionFound = false;\r\n    for (const [row, col] of indices) {\r\n        shuffle(numbers);\r\n        for (const num of numbers) {\r\n            // Try this number\r\n            state[row][col] = num;\r\n            // check for a solution\r\n            const solutions = solver(state);\r\n            if (solutions.length == 0) {\r\n                // no solution found, revert\r\n                state[row][col] = 0;\r\n            }\r\n            else {\r\n                if (solutions.length == 1) {\r\n                    // unique solution found\r\n                    uniqueSolutionFound = true;\r\n                }\r\n                break;\r\n            }\r\n        }\r\n        if (uniqueSolutionFound) {\r\n            break;\r\n        }\r\n    }\r\n\r\n    // Step 2: Store the unique solution\r\n    const solutions = solver(state);\r\n    const startState = solutions[0].map(row => row.map(square => square));\r\n    const endState = solutions[0].map(row => row.map(square => square));\r\n\r\n    // Step 3: Starting from the solution, randomly remove numbers\r\n    // until the target number of starting squares is reached,\r\n    // while maintaining the uniqueness of the solution\r\n    shuffle(indices);\r\n    let remainingSquares = indices.length;\r\n    for (const [row, col] of indices) {\r\n        if (remainingSquares <= minStartSquares) {\r\n            break;\r\n        }\r\n        // try removing the current square\r\n        const num = startState[row][col];\r\n        startState[row][col] = 0;\r\n        const solutions = solver(startState);\r\n        if (solutions.length != 1) {\r\n            // no longer has unique solution, revert\r\n            startState[row][col] = num;\r\n        }\r\n        else {\r\n            remainingSquares--;\r\n        }\r\n    }\r\n\r\n    // Return the starting board and the solution\r\n    return { startState, endState };\r\n}\r\n\r\nmodule.exports = generate;\n\n//# sourceURL=webpack://personal-website/./models/sudoku/generator.js?");

/***/ }),

/***/ "./models/sudoku/greedySolver.js":
/*!***************************************!*\
  !*** ./models/sudoku/greedySolver.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const dependencies = __webpack_require__(/*! ./boardDependencies */ \"./models/sudoku/boardDependencies.js\");\r\n\r\n// Greedy sudoku solver that returns an array of valid solutions from\r\n// the given board state. The solver will stop after two solutions\r\n// have been found.\r\nconst solve = function (board) {\r\n    // Array to store found solutions\r\n    const solutions = [];\r\n\r\n    // Array to store valid number options\r\n    const options = new Array(9).fill(0).map(() => new Array(9).fill(0).map(() => new Set()));\r\n    for (let r = 0; r < 9; r++) {\r\n        for (let c = 0; c < 9; c++) {\r\n            if (board[r][c] != 0) {\r\n                options[r][c].add(board[r][c]);\r\n                // Check for conflicts among starting squares\r\n                for (let [rr, cc] of dependencies[r][c]) {\r\n                    if (board[rr][cc] == board[r][c]) {\r\n                        // Conflict found\r\n                        return solutions;\r\n                    }\r\n                }\r\n            }\r\n            else {\r\n                for (let num = 1; num <= 9; num++) {\r\n                    let valid = true;\r\n                    for (let [rr, cc] of dependencies[r][c]) {\r\n                        if (board[rr][cc] == num) {\r\n                            valid = false;\r\n                            break;\r\n                        }\r\n                    }\r\n                    if (valid) {\r\n                        options[r][c].add(num);\r\n                    }\r\n                }\r\n            }\r\n        }\r\n    }\r\n\r\n    // Recursive solver\r\n    const solver = function (board) {\r\n        // Stop recursion if multiple solutions have been found\r\n        if (solutions.length >= 2) {\r\n            return false;\r\n        }\r\n        \r\n        // Choose the square with the least number of options to minimize branching\r\n        let minOptions = 10;\r\n        let chosenSquare = null;\r\n        for (let r = 0; r < 9; r++) {\r\n            for (let c = 0; c < 9; c++) {\r\n                if (board[r][c] == 0) {\r\n                    if (options[r][c].size < minOptions) {\r\n                        minOptions = options[r][c].size;\r\n                        chosenSquare = [r, c];\r\n                    }\r\n                }\r\n            }\r\n        }\r\n\r\n        // If no square is chosen, that means all squares have been filled\r\n        if (!chosenSquare) {\r\n            // Store the solution\r\n            solutions.push(board.map(row => row.map(square => square)));\r\n            return true;\r\n        }\r\n\r\n        // Otherwise, try each valid number one at a time\r\n        else {\r\n            const [row, col] = chosenSquare;\r\n            let solutionFound = false;\r\n            for (const num of options[row][col].values()) {\r\n                // Try this number\r\n                let valid = true;\r\n                const dependenciesAffected = [];\r\n                board[row][col] = num;\r\n                for (const [r, c] of dependencies[row][col]) {\r\n                    if (board[r][c] == 0 && options[r][c].has(num)) {\r\n                        options[r][c].delete(num);\r\n                        dependenciesAffected.push([r, c]);\r\n                        if (options[r][c].size == 0) {\r\n                            // Invalid board state\r\n                            valid = false;\r\n                            break;\r\n                        }\r\n                    }\r\n                }\r\n                if (valid) {\r\n                    solutionFound = solver(board) || solutionFound;\r\n                }\r\n                for (const [r, c] of dependenciesAffected) {\r\n                    options[r][c].add(num);\r\n                }\r\n                board[row][col] = 0;\r\n            }\r\n            return solutionFound;\r\n        }\r\n    }\r\n\r\n    solver(board);\r\n    \r\n    return solutions;\r\n}\r\n\r\nmodule.exports = solve;\n\n//# sourceURL=webpack://personal-website/./models/sudoku/greedySolver.js?");

/***/ }),

/***/ "./models/sudoku/sudoku.js":
/*!*********************************!*\
  !*** ./models/sudoku/sudoku.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const generator = __webpack_require__(/*! ./generator */ \"./models/sudoku/generator.js\");\r\nconst checkEmpty = __webpack_require__(/*! ./checkEmpty */ \"./models/sudoku/checkEmpty.js\");\r\nconst checkConflict = __webpack_require__(/*! ./checkConflict */ \"./models/sudoku/checkConflict.js\");\r\n\r\n/* ===== MODEL ====== */\r\n// Create a class to represent the state of the sudoku game\r\nclass Sudoku {\r\n    #board = null;\r\n    #start = null;\r\n\r\n    // Constructor that initializes the sudoku game with an empty board\r\n    constructor () {\r\n        this.#start = new Array(9).fill(0).map(() => new Array(9).fill(0));\r\n        this.#board = new Array(9).fill(0).map(() => new Array(9).fill(0));\r\n    }\r\n\r\n    // Getter for the board, return a deep copy\r\n    getBoard () {\r\n        return this.#board.map(row => row.map(square => square));\r\n    }\r\n\r\n    // Getter for starting state\r\n    getStartState () {\r\n        return this.#start.map(row => row.map(square => square));\r\n    }\r\n\r\n    // Checker for square coordinates\r\n    isValidCoordinate (row, col) {\r\n        if (typeof(row) != \"number\") {\r\n            throw TypeError(\"'row' argument must be a number\");\r\n        }\r\n        if (typeof(col) != \"number\") {\r\n            throw TypeError(\"'col' argument must be a number\");\r\n        }\r\n        return (row >= 0) && (row < 9) && (col >= 0) && (col < 9);\r\n    }\r\n\r\n    // Change the number of the square at the specified coordinate.\r\n    // Can only change a non-starting square.\r\n    // Return true if the change operation is successful, false otherwise.\r\n    changeSquareAt (row, col, num) {\r\n        if (!this.isValidCoordinate(row, col)) {\r\n            throw Error(\"Invalid square coordinate\");\r\n        }\r\n        if (typeof(num) != \"number\") {\r\n            throw TypeError(\"'num' argument must be a number\");\r\n        }\r\n        if (num < 0 || num > 9) {\r\n            throw Error(\"'num' argument must be between 0-9\");\r\n        }\r\n        if (this.#start[row][col] > 0) {\r\n            // The coordinate is a starting square\r\n            return false\r\n        }\r\n        this.#board[row][col] = num;\r\n        return true;\r\n    }\r\n\r\n    // Generate a new random board\r\n    // - minStartSquares: Specify the number of filled squares in \r\n    // the starting board, which is a measure of difficulty. The\r\n    // function will try to reach this target number as close as \r\n    // possible while maintaining the unique solution.\r\n    generateNewBoard (minStartSquares = 0) {\r\n        const { startState, endState } = generator(minStartSquares);\r\n        this.#start = startState;\r\n        for (let row = 0; row < 9; row++) {\r\n            for (let col = 0; col < 9; col++) {\r\n                this.#board[row][col] = startState[row][col];\r\n            }\r\n        }\r\n    }\r\n\r\n    // Validate the current board state, returning an object:\r\n    // - gameover: boolean indicating whether the game is over (all squares\r\n    //             have been filled and there are no conflicts)\r\n    // - empty: an array of coordinates [r,c] of unfilled squares\r\n    // - conflict: an array of coordinates [r,c] of conflicting squares\r\n    validate () {\r\n        const res = {\r\n            gameover: false,    \r\n            empty: checkEmpty(this.#board),\r\n            conflict: checkConflict(this.#board)\r\n        }\r\n\r\n        res.gameover = res.empty.length == 0 && res.conflict.length == 0;\r\n\r\n        return res;\r\n    }\r\n}\r\n\r\nmodule.exports = Sudoku;\n\n//# sourceURL=webpack://personal-website/./models/sudoku/sudoku.js?");

/***/ }),

/***/ "./models/sudoku/validateBoard.js":
/*!****************************************!*\
  !*** ./models/sudoku/validateBoard.js ***!
  \****************************************/
/***/ ((module) => {

eval("// Validates a given sudoku board. A board is valid if it's a 9x9 array\r\n// and it consists only of numbers from 0-9. \r\nconst validate = function (board) {\r\n    if (!Array.isArray(board) || board.length != 9) {\r\n        return false;\r\n    }\r\n    for (const row of board) {\r\n        if (!Array.isArray(row) || row.length != 9) {\r\n            return false;\r\n        }\r\n        for (const item of row) {\r\n            if (typeof(item) != \"number\") {\r\n                return false;\r\n            }\r\n            else if (item < 0 || item > 9) {\r\n                return false;\r\n            }\r\n        }\r\n    }\r\n\r\n    return true;\r\n}\r\n\r\nmodule.exports = validate;\n\n//# sourceURL=webpack://personal-website/./models/sudoku/validateBoard.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./controllers/sudoku/sudoku.js");
/******/ 	
/******/ })()
;