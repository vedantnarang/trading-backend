const db = require('../utils/db');
const orderService = require('../services/orderService');

const createOrder = (req, res) => {
    try {
        const order = orderService.placeOrder(req.body);
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const getOrderById = (req, res) => {
    const { orderId } = req.params;
    const order = db.orders.find(o => o.id === orderId);

    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(order);
};

const getAllOrders = (req, res) => {
    res.status(200).json(db.orders);
};

module.exports = { createOrder, getOrderById, getAllOrders };