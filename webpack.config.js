const path = require('node:path');

module.exports = {
    mode: 'development',
    entry: {
        sudoku: path.join(__dirname, 'controllers/sudoku/sudoku.js')
    },
    output: {
        path: path.join(__dirname, 'public/scripts'),
        filename: '[name].js'
    }
}