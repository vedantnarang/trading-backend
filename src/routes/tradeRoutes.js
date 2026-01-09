// src/routes/tradeRoutes.js
const express = require('express');
const router = express.Router();
const tradeController = require('../controllers/tradeController');

router.get('/', tradeController.getAllTrades);

module.exports = router;
