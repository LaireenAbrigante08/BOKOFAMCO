// app.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db'); // Database connection
const productRoutes = require('./routes/productRoutes'); // Product routes
const orderRoutes = require('./routes/orderRoutes'); // Order routes
const userRoutes = require('./routes/userRoutes'); // User routes

const app = express();
const PORT = 3000;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public')); // Serve static files
app.set('view engine', 'ejs'); // Set EJS as template engine

// Routes setup
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);

// Home Route
app.get('/', (req, res) => {
  res.render('index', { title: "Welcome to BOKOFAMCO" });
});

// Start the server
app.listen(3001, () => {
    console.log('Server started on http://localhost:3001');
});
