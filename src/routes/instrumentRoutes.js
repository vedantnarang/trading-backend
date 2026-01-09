// src/routes/instrumentRoutes.js
const express = require('express');
const router = express.Router();
const instrumentController = require('../controllers/instrumentController');

// Define the GET route
router.get('/', instrumentController.getAllInstruments);

module.exports = router;