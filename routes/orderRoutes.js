// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// View all orders
router.get('/', (req, res) => {
  db.query('SELECT * FROM orders', (err, results) => {
    if (err) throw err;
    res.render('orders', { orders: results });
  });
});

// Place an order
router.post('/place', (req, res) => {
  const { member_id, order_date, total_amount, status, payment_method } = req.body;
  const sql = 'INSERT INTO orders (member_id, order_date, total_amount, status, payment_method) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [member_id, order_date, total_amount, status, payment_method], (err, result) => {
    if (err) throw err;
    res.redirect('/orders');
  });
});

module.exports = router;
