const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public')); // Serve static files (like CSS)

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cooperatives'
});

// Connect to the database
db.connect((err) => {
    if (err) throw err;
    console.log('MySQL connected...');
});

// Routes

// Home Page
app.get('/', (req, res) => {
    const cooperativeInfo = {
        name: 'Cooperative Name',
        description: 'Welcome to the Cooperative E-Commerce Store! We provide farm supplies and equipment rentals for our members.',
    };
    res.render('index', { cooperative: cooperativeInfo });
});

// About Us Page
app.get('/about', (req, res) => {
    const cooperativeInfo = {
        name: 'Cooperative Name'
    };
    res.render('about', { cooperative: cooperativeInfo });
});

// Contact Us Page
app.get('/contact', (req, res) => {
    const cooperativeInfo = {
        name: 'Cooperative Name'
    };
    res.render('contact', { cooperative: cooperativeInfo });
});

// Products Page (Farm Supplies)
app.get('/products', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) throw err;
        res.render('products', { products: results });
    });
});

// Equipment Rentals Page
app.get('/equipment', (req, res) => {
    db.query('SELECT * FROM equipment', (err, results) => {
        if (err) throw err;
        res.render('equipment', { equipment: results });
    });
});

// Member Information Page
app.get('/members', (req, res) => {
    db.query('SELECT * FROM members', (err, results) => {
        if (err) throw err;
        res.render('members', { members: results });
    });
});

// Loans Page
app.get('/loans', (req, res) => {
    db.query('SELECT * FROM loans', (err, results) => {
        if (err) throw err;
        res.render('loans', { loans: results });
    });
});

// Transactions Page
app.get('/transactions', (req, res) => {
    db.query('SELECT * FROM orders', (err, results) => {
        if (err) throw err;
        res.render('transactions', { transactions: results });
    });
});

// Checkout and Payment Route
app.post('/checkout', (req, res) => {
    const { memberId, total, paymentMethod } = req.body;
    const query = 'INSERT INTO orders (member_id, total, payment_method) VALUES (?, ?, ?)';
    db.query(query, [memberId, total, paymentMethod], (err, result) => {
        if (err) throw err;
        res.send('Order placed successfully');
    });
});

// Create Product
app.post('/products/create', (req, res) => {
    const { name, description, price } = req.body;
    const query = 'INSERT INTO products (name, description, price) VALUES (?, ?, ?)';
    db.query(query, [name, description, price], (err, result) => {
        if (err) throw err;
        res.redirect('/products');
    });
});

// Create Equipment
app.post('/equipment/create', (req, res) => {
    const { name, description, rental_price } = req.body;
    const query = 'INSERT INTO equipment (name, description, rental_price) VALUES (?, ?, ?)';
    db.query(query, [name, description, rental_price], (err, result) => {
        if (err) throw err;
        res.redirect('/equipment');
    });
});

// Create Member
app.post('/members/create', (req, res) => {
    const { name, email, loan_credit } = req.body;
    const query = 'INSERT INTO members (name, email, loan_credit) VALUES (?, ?, ?)';
    db.query(query, [name, email, loan_credit], (err, result) => {
        if (err) throw err;
        res.redirect('/members');
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
