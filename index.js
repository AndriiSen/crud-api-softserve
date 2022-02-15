const express = require('express')
const cors = require('cors')
const app = express()
const users = require('./routes/users');
const iPaddress = require('./helpers/getIpForSwagger')

const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "REST API",
            version: "1.0.0",
            description: "A simle rest API"
        },
        servers: [ 
            {
                url: "http://localhost:80"
            },
            {
                url: `http://${iPaddress}:80`
            }
        ]
    },
    apis: ["./routes/*.js"]
}
const specs = swaggerJsDoc(options)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

app.use(express.json());
app.use(cors());


app.use('/user', users)


app.listen(4000, () => {
    console.log('Server running on port 3001...')
});

console.log(iPaddress)
