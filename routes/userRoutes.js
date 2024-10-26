// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// User registration
router.post('/register', (req, res) => {
  const { name, email, password, phone, address } = req.body;
  const sql = 'INSERT INTO members (name, email, password, phone, address) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [name, email, password, phone, address], (err, result) => {
    if (err) throw err;
    res.redirect('/');
  });
});

// User login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM members WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.redirect('/');
    } else {
      res.send('Invalid credentials');
    }
  });
});

module.exports = router;
