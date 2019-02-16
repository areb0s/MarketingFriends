const express = require('express');

const router = express.Router();

// API LIST
const usersApi = require('./users');
const salesApi = require('./sales');
const spendsApi = require('./spends');
const adminApi = require('./admin');

// API ROUTE
router.use('/users', usersApi);
router.use('/sales', salesApi);
router.use('/spends', spendsApi);
router.use('/admin', adminApi);

module.exports = router;
