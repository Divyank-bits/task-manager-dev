const swaggerJSDoc = require('swagger-jsdoc')
const swaggerComponents = require('./components')

const swaggerDef = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Task Manager API ',
            version: '1.0.0'
        },
        components: swaggerComponents,
       
        servers: [
            {
                url: 'http://localhost:3000/'
            }
        ],
        tags: [
            {
                name: 'Authorization',
                description: 'Endpoints related to authorization'
            },
            {
                name: 'User',
                description: 'Endpoints related to user management'
            },
            {
                name: 'Task',
                description: 'Endpoints related to task management'
            }
        ],
    },
    apis: ['./src/routes/auth.routes.js','./src/routes/user.routes.js', './src/routes/task.routes.js', ],
    
}
const swaggerSpec = swaggerJSDoc(swaggerDef);
module.exports = {swaggerDef,swaggerSpec}