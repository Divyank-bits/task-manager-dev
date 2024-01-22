const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})

// Check database connection
const db = mongoose.connection;
db.on('error',console.error.bind(console,'error'))
db.once('open', ()=> {
    console.log('Connected');
})
// mongoose.set('debug', true);