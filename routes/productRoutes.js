// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Display all products
router.get('/', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) throw err;
    res.render('products', { products: results });
  });
});

// Add a new product
router.post('/add', (req, res) => {
  const { name, category, price, stock_quantity, description } = req.body;
  const sql = 'INSERT INTO products (name, category, price, stock_quantity, description) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [name, category, price, stock_quantity, description], (err, result) => {
    if (err) throw err;
    res.redirect('/products');
  });
});

module.exports = router;
