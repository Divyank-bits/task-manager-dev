const express = require('express');
require('./src/db/mongoose')
const authroute = require('./src/routes/auth.routes')
const userroute = require('./src/routes/user.routes')
const taskroute = require('./src/routes/task.routes')
const bcryptjs = require('bcryptjs');
const path = require('path');
// const auth = require('./src/middleware/auth')
const auth = require('./src/middleware/auth.header')
const cookieParser = require('cookie-parser');
const { errorLoggerMiddleware, customlogger } = require('./src/config/errorlogs');
const logger = require('./src/middleware/logs')
const { swaggerDef, swaggerSpec } = require('./src/docs/swaggerDef')
const swaggerUi = require('swagger-ui-express')
const errorHandler = require('./src/middleware/errorHandler')

const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();


const app = express();
const serverUrl = process.env.SERVER_URL;
const port = process.env.PORT || 3000


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(express.json())
app.use(express.urlencoded({ urlencoded: true }))
const swaggerUiOptions = {
    explorer: true
};
var options = {
    swaggerOptions: {
      authAction :{ JWT: {name: "JWT", schema: {type: "apiKey", in: "header", name: "Authorization", description: ""}, value: "Bearer <JWT>"} }
    }
  };
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec,options))
// app.use(auth)
app.use(logger)
app.use(authroute)
app.use(userroute);
app.use(taskroute);
// app.use(auth)
app.use(errorLoggerMiddleware)
app.use(errorHandler);

const server = app.listen(port, () => {
    console.log('Listening on port ' + port)
})






// mongoose.connection.close();

// const directorypath=path.join(__dirname,'index.html');

// const userRouter = require('./src/routers/user');
// const userRouter = require('./src/routers/routes/routes.js')
// const taskRouter = require('./src/routers/task');
// const router =  require('./src/routes')
// const {user} = require('./src/routes')
// const expressWinston = require('express-winston')
// const { transports, format } = require('winston')
// require('winston-mongodb')

// app.use(userRouter)
// app.use(taskRouter)
// app.use(router);