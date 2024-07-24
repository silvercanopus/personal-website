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

eval("const Sudoku = __webpack_require__(/*! ../../models/sudoku/sudoku */ \"./models/sudoku/sudoku.js\");\r\n\r\n/* ===== CONTROLLER ====== */\r\nconst sudoku = new Sudoku();\r\n\r\n// Get a reference for the page element\r\nconst page = document.querySelector('body');\r\n\r\n// Get a reference for each of the square elements\r\nconst squareElements = [...document.querySelectorAll('.sudoku-square')];\r\nconst squares = [];\r\nwhile (squareElements.length) {\r\n    squares.push(squareElements.splice(0, 9));\r\n}\r\nconst numberButtons = [...document.querySelectorAll('.sudoku-number-button')];\r\n\r\n// Function for rendering the current board state onto the page\r\nfunction render() {\r\n    const board = sudoku.getBoard();\r\n    const val = sudoku.validate();\r\n\r\n    // Render the board\r\n    for (let r = 0; r < 9; r++) {\r\n        for (let c = 0; c < 9; c++) {\r\n            if (1 <= board[r][c] && board[r][c] <= 9) {\r\n                squares[r][c].innerText = board[r][c];\r\n            }\r\n            else {\r\n                squares[r][c].innerText = \"\";\r\n            }\r\n            squares[r][c].classList.remove('focused');\r\n            squares[r][c].classList.remove('conflict');\r\n        }\r\n    }\r\n\r\n    // Add focus indicator\r\n    const focus = sudoku.getFocus();\r\n    if (focus) {\r\n        let [r, c] = focus;\r\n        squares[r][c].classList.add('focused');\r\n    }\r\n\r\n    // Add conflict indicator\r\n    for (const [r, c] of val.conflict) {\r\n        squares[r][c].classList.add('conflict');\r\n    }\r\n}\r\n\r\n// Add click events for switching focus to the clicked square\r\nfor (let r = 0; r < 9; r++) {\r\n    for (let c = 0; c < 9; c++) {\r\n        squares[r][c].addEventListener('click', (event) => {\r\n            try {\r\n                sudoku.focus(r, c);\r\n                event.stopPropagation();\r\n                render();\r\n            }\r\n            catch (e) {\r\n                console.log(e);\r\n            }\r\n        })\r\n    }\r\n}\r\n\r\n// Add click event outside the board that removes focus\r\npage.addEventListener('click', (event) => {\r\n    sudoku.unfocus();\r\n    render();\r\n})\r\n\r\n// Disable some default keyboard events\r\npage.addEventListener('keydown', (event) => {\r\n    switch (event.key) {\r\n        // Disable scrolling via keyboard keys\r\n        case \"ArrowUp\": case \"ArrowDown\": case \"ArrowLeft\": case \"ArrowRight\": case \" \":\r\n            event.preventDefault();\r\n            break;\r\n    }\r\n})\r\n\r\n// Define some keyboard events\r\nconst arrowKeys = [\"ArrowUp\", \"ArrowDown\", \"ArrowLeft\", \"ArrowRight\"];\r\nconst numberKeys = [\"1\", \"2\", \"3\", \"4\", \"5\", \"6\", \"7\", \"8\", \"9\", \"0\"];\r\npage.addEventListener('keyup', (event) => {\r\n    const keyName = event.key;\r\n    console.log(keyName);\r\n\r\n    // Movement via arrow keys\r\n    if (arrowKeys.includes(keyName)) {\r\n        let newFocus = sudoku.getFocus();\r\n        if (newFocus) {\r\n            switch (keyName) {\r\n                case \"ArrowUp\": \r\n                    newFocus[0]--;\r\n                    break;\r\n                case \"ArrowDown\":\r\n                    newFocus[0]++;\r\n                    break;\r\n                case \"ArrowLeft\": \r\n                    newFocus[1]--;\r\n                    break;\r\n                case \"ArrowRight\": \r\n                    newFocus[1]++;\r\n                    break;\r\n            }\r\n            if (sudoku.isValidCoordinate(...newFocus)) {\r\n                sudoku.focus(...newFocus);\r\n                render();\r\n            }\r\n        }\r\n    }\r\n\r\n    // Changing number via number keys\r\n    else if (numberKeys.includes(keyName)) {\r\n        if (sudoku.getFocus()) {\r\n            sudoku.changeSquare(Number.parseInt(keyName));\r\n            render();\r\n        }\r\n    }\r\n    \r\n    // Valid keys for deletion\r\n    else if (keyName == \"Backspace\" || keyName == \"Delete\" || keyName == \" \") {\r\n        if (sudoku.getFocus()) {\r\n            sudoku.changeSquare(0);\r\n            render();\r\n        }\r\n    }\r\n});\r\n\r\n// Add click event to the number buttons\r\nfor (let i = 0; i < 9; i++) {\r\n    numberButtons[i].addEventListener('click', (event) => {\r\n        if (sudoku.getFocus()) {\r\n            sudoku.changeSquare(i+1);\r\n            render();\r\n        }\r\n        event.stopPropagation();\r\n    });\r\n}\r\n\r\n// First render\r\nrender();\n\n//# sourceURL=webpack://personal-website/./controllers/sudoku/sudoku.js?");

/***/ }),

/***/ "./models/sudoku/sudoku.js":
/*!*********************************!*\
  !*** ./models/sudoku/sudoku.js ***!
  \*********************************/
/***/ ((module) => {

eval("/* ===== MODEL ====== */\r\n// Create a class to represent the state of the sudoku game\r\nclass Sudoku {\r\n    #board = null;\r\n    #focus = null;\r\n\r\n    // Constructor\r\n    // TODO: Add a way to randomize starting board with RNG \r\n    constructor () {\r\n        this.#board = new Array(9).fill(0).map(() => new Array(9).fill(0));\r\n    }\r\n\r\n    // Getter for the board, return a deep copy\r\n    getBoard () {\r\n        return this.#board.map(row => row.map(square => square));\r\n    }\r\n\r\n    // Getter for the focused square coordinate, return a deep copy\r\n    getFocus () {\r\n        if (this.#focus) {\r\n            return [...this.#focus];\r\n        }\r\n        return null;\r\n    }\r\n\r\n    // Checker for square coordinates\r\n    isValidCoordinate (row, col) {\r\n        if (typeof(row) != \"number\") {\r\n            throw TypeError(\"'row' argument must be a number\");\r\n        }\r\n        if (typeof(col) != \"number\") {\r\n            throw TypeError(\"'col' argument must be a number\");\r\n        }\r\n        return (row >= 0) && (row < 9) && (col >= 0) && (col < 9);\r\n    }\r\n\r\n    // Switch focus to the specified coordinate\r\n    focus (row, col) {\r\n        if (!this.isValidCoordinate(row, col)) {\r\n            throw Error(\"Invalid square coordinate\");\r\n        }\r\n        this.#focus = [row, col];\r\n    }\r\n\r\n    // Remove focus\r\n    unfocus () {\r\n        this.#focus = null;\r\n    }\r\n\r\n    // Change the number of the square at the specified coordinate\r\n    changeSquareAt (row, col, num) {\r\n        if (!this.isValidCoordinate(row, col)) {\r\n            throw Error(\"Invalid square coordinate\");\r\n        }\r\n        if (typeof(num) != \"number\") {\r\n            throw TypeError(\"'num' argument must be a number\");\r\n        }\r\n        if (num < 0 || num > 9) {\r\n            throw Error(\"'num' argument must be between 0-9\");\r\n        }\r\n        this.#board[row][col] = num;\r\n    }\r\n\r\n    // Change the number of the focused square\r\n    changeSquare (num) {\r\n        if (!this.#focus) {\r\n            throw Error(\"No square is being focused on\");\r\n        }\r\n        this.changeSquareAt(...this.#focus, num);\r\n    }\r\n\r\n    // Validate the current board state, returning an object:\r\n    // - gameover: boolean value indicating whether the game is over or not\r\n    // - empty: array of coordinates whose square is empty\r\n    // - conflict: array of coordinates whose square conflict with another square\r\n    validate () {\r\n        const res = {\r\n            gameover: false,\r\n            empty: [],\r\n            conflict: []\r\n        };\r\n\r\n        // Scan for empty squares\r\n        for (let r = 0; r < 9; r++) {\r\n            for (let c = 0; c < 9; c++) {\r\n                if (this.#board[r][c] == 0) {\r\n                    res.empty.push([r, c]);\r\n                }\r\n            }\r\n        }\r\n\r\n        // Array and function to help with checking conflicts\r\n        const conflictBoard = new Array(9).fill(0).map(() => new Array(9).fill(false));\r\n        const checkGroup = function(group) {\r\n            // group consists of arrays of [num, row, col]\r\n            const exists = new Array(10).fill(null);\r\n            for (let [num, r, c] of group) {\r\n                if (exists[num]) {\r\n                    conflictBoard[r][c] = true;\r\n                    conflictBoard[exists[num][0]][exists[num][1]] = true;\r\n                }\r\n                else {\r\n                    exists[num] = [r, c];\r\n                }\r\n            }\r\n        }\r\n\r\n        // Scan for conflicting squares - rows\r\n        for (let r = 0; r < 9; r++) {\r\n            const group = [];\r\n            for (let c = 0; c < 9; c++) {\r\n                if (this.#board[r][c] != 0) {\r\n                    group.push([this.#board[r][c], r, c]);\r\n                }\r\n            }\r\n            checkGroup(group);\r\n        }\r\n\r\n        // Scan for conflicting squares - columns\r\n        for (let c = 0; c < 9; c++) {\r\n            const group = [];\r\n            for (let r = 0; r < 9; r++) {\r\n                if (this.#board[r][c] != 0) {\r\n                    group.push([this.#board[r][c], r, c]);\r\n                }\r\n            }\r\n            checkGroup(group);\r\n        }\r\n\r\n        // Scan for conflicting squares - 3x3 sections\r\n        for (let i = 0; i < 9; i += 3) {\r\n            for (let j = 0; j < 9; j += 3) {\r\n                const group = [];\r\n                for (let r = i; r < i+3; r++) {\r\n                    for (let c = j; c < j+3; c++) {\r\n                        if (this.#board[r][c] != 0) {\r\n                            group.push([this.#board[r][c], r, c]);\r\n                        }\r\n                    }\r\n                }\r\n                checkGroup(group);\r\n            }\r\n        }\r\n\r\n        // Add any conflicting squares to the result array\r\n        for (let r = 0; r < 9; r++) {\r\n            for (let c = 0; c < 9; c++) {\r\n                if (conflictBoard[r][c]) {\r\n                    res.conflict.push([r, c]);\r\n                }\r\n            }\r\n        }\r\n\r\n        // Game is considered over if there's no empty square and no conflict\r\n        res.gameover = (res.empty.length == 0) && (res.conflict.length == 0);\r\n\r\n        return res;\r\n    }\r\n}\r\n\r\nmodule.exports = Sudoku;\n\n//# sourceURL=webpack://personal-website/./models/sudoku/sudoku.js?");

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