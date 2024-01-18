const components = {
    securitySchemes: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
        }
    },
    schemas: {
        User: {
            type: Object,
            properties: {
                name: {
                    type: String
                },
                email: {
                    type: String
                },
                password: {
                    type: String
                },
                age: {
                    type: Number
                }
            }
        },
        UserLogin: {
            type: Object,
            properties: {
                email: {
                    type: String
                },
                password: {
                    type: String
                },
            }
        },
        Task: {
            type: Object,
            properties: {
                description: {
                    type: String
                },
                completed: {
                    type: Boolean
                }
            }
        },

    }
}

module.exports = components