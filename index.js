// Common imports
const path = require('path');

// Initialize Express
const express = require('express');
const app = express();

// Set EJS (with ejsMate) to be the template engine
const ejsMate = require('ejs-mate');
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

// Specify the location of the templates
app.set('views', path.join(__dirname, 'views'));

// Specify the location of static files
app.use(express.static(path.join(__dirname, 'public')));

// Start the server on port 3000 (no env variables yet)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})

// Create route for the home page
app.get('/', (req, res) => {
    res.render('index');
})

// Create route for the blog page
app.get('/blog', (req, res) => {
    res.render('blog');
})

// Create route for the contact page
app.get('/contact', (req, res) => {
    res.render('contact');
})

// Create route for the sudoku page
app.get('/sudoku', (req, res) => {
    res.render('sudoku');
})
