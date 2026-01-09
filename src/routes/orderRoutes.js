// src/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/', orderController.createOrder);
router.get('/:orderId', orderController.getOrderById);
router.get('/', orderController.getAllOrders); // Useful for debugging

module.exports = router;