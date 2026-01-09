// src/services/orderService.js
const db = require('../utils/db');
const { v4: uuidv4 } = require('uuid');

// Helper: Update Portfolio (Handles BUY and SELL)
const updatePortfolio = (symbol, qty, price, type) => {
    let holding = db.portfolio.find(p => p.symbol === symbol);

    if (type === 'BUY') {
        if (holding) {
            
            const totalCost = (holding.quantity * holding.averagePrice) + (qty * price);
            const totalQty = holding.quantity + qty;
            
            holding.quantity = totalQty;
            holding.averagePrice = totalCost / totalQty;
            holding.currentValue = totalQty * price;
        } else {
            // New position
            db.portfolio.push({
                symbol: symbol,
                quantity: qty,
                averagePrice: price,
                currentValue: qty * price
            });
        }
    } 
    else if (type === 'SELL') {
        // Validation: Do they own the stock?
        if (!holding || holding.quantity < qty) {
            throw new Error(`Insufficient holdings. You only have ${holding ? holding.quantity : 0} shares.`);
        }

        // Subtract Quantity
        holding.quantity -= qty;
        holding.currentValue = holding.quantity * price; // Update Value

        // (Optional: If quantity is 0, we could remove it, but leaving it as 0 is fine)
    }
};

const placeOrder = (orderData) => {
    const { symbol, quantity, price, type, style } = orderData;

    // --- 1. STRICT VALIDATION ---

    // Validate Symbol and Quantity
    if (!symbol || !quantity || quantity <= 0) {
        throw new Error('Invalid Order: Symbol and Quantity > 0 are required.');
    }

    // Validate Order Style (Must be MARKET or LIMIT)
    if (!style || !['MARKET', 'LIMIT'].includes(style)) {
        throw new Error('Invalid Order Style: Must be MARKET or LIMIT');
    }

    // Validate Order Type (Must be BUY or SELL)
    if (!type || !['BUY', 'SELL'].includes(type)) {
        throw new Error('Invalid Order Type: Must be BUY or SELL');
    }

    // --- 2. CHECK INSTRUMENT ---
    const instrument = db.instruments.find(i => i.symbol === symbol);
    if (!instrument) {
        throw new Error('Instrument not found');
    }

    // --- 3. CREATE ORDER OBJECT ---
    const newOrder = {
        id: uuidv4(),
        symbol,
        quantity,
        type, // BUY or SELL
        style, // MARKET or LIMIT
        price: style === 'LIMIT' ? price : instrument.price,
        status: 'NEW',
        timestamp: new Date()
    };

    // --- 4. EXECUTION LOGIC ---
    
    if (style === 'MARKET') {
        // Market orders execute immediately
        try {
            updatePortfolio(symbol, quantity, instrument.price, type);

            newOrder.status = 'EXECUTED';
            newOrder.executionPrice = instrument.price;


            const trade = {
                id: uuidv4(),
                orderId: newOrder.id,
                symbol: newOrder.symbol,
                quantity: newOrder.quantity,
                price: newOrder.executionPrice,
                timestamp: new Date()
            };
            db.trades.push(trade);

        } catch (error) {
            throw error; 
        }
    } else {
        newOrder.status = 'PLACED';
    }

    //saving
    db.orders.push(newOrder);
    return newOrder;
};

module.exports = { placeOrder };