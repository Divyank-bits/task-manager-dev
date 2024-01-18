const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    level: String,
    message: String,
    meta: Object,
    timestamp: { type: Date, default: Date.now },
});

const errorLog = mongoose.model('errorLog', logSchema);
const customLog = mongoose.model('customLog', logSchema)

module.exports = {errorLog,customLog};