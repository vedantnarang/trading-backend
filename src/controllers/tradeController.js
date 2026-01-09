const db = require('../utils/db');

const getAllTrades = (req, res) => {
    
    res.status(200).json(db.trades);
};

module.exports = { getAllTrades };