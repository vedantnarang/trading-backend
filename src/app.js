const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const instrumentRoutes = require('./routes/instrumentRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const orderRoutes = require('./routes/orderRoutes');
const tradeRoutes = require('./routes/tradeRoutes'); // <--- NEW

const app = express();

app.use(cors());
app.use(bodyParser.json());

// routes
app.use('/api/v1/instruments', instrumentRoutes);
app.use('/api/v1/portfolio', portfolioRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/trades', tradeRoutes); 


app.get('/', (req, res) => {
    res.json({ message: 'trading platform API is running!!!!!' });
});

module.exports = app;