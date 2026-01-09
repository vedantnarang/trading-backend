const db = require('../utils/db');

const getAllInstruments = (req, res) => {

    res.status(200).json(db.instruments);
};

module.exports = { getAllInstruments };