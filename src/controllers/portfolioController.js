const db = require('../utils/db');

const getPortfolio = (req, res) => {
   

    const response = {
        holdings: db.portfolio,
        totalValue: db.portfolio.reduce((acc, item) => acc + item.currentValue, 0)
    };

    res.status(200).json(response);
};

module.exports = { getPortfolio };