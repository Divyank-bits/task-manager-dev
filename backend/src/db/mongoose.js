const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/task-manager', {
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