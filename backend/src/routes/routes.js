const authRoute = require('./auth.routes');
const taskRoute = require('./task.routes')
const userRoute = require('./user.routes')

module.exports={authRoute,taskRoute,userRoute}


// const express = require('express');
// const authRoute = require('./auth.routes');
// const taskRoute = require('./task.routes')
// const userRoute = require('./user.routes')

// const router = express.Router();

// const defaultRoutes = [
//     {
//         path: '/auth',
//         route: authRoute,
//     },
//     {
//         path: '/users',
//         route: userRoute,
//     },
// ];
// defaultRoutes.forEach((route) => {
//     router.use(route.path, route.route);
// });

// module.exports=router