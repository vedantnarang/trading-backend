const db = {
    //single user only
    users: [
        { id: 1, name: "test trader", balance: 500000 } 
    ],
    
    instruments: [
        { symbol: "BAJAJFINSV", name: "Bajaj Finserv Ltd.", type: "STOCK", price: 1600.00 },
        { symbol: "BAJAJ-AUTO", name: "Bajaj Auto Ltd.", type: "STOCK", price: 7200.00 },
        { symbol: "BAJAJELEC", name: "Bajaj Electricals Ltd.", type: "STOCK", price: 1050.00 },
        { symbol: "BAJAJHCARE", name: "Bajaj Healthcare Ltd.", type: "STOCK", price: 380.00 }
    ],

    //empyt initially
    orders: [],

    trades: [],

    portfolio: []
};

module.exports = db;