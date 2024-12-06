const express = require('express');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const connectDB = require('./config/database');
const { port, beUrl } = require('./config/env');
const errorHandler = require('./middleware/errorHandler');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const morgan = require('morgan')


const app = express();

connectDB();

app.use(morgan('dev'))

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API Health Check, current time: ' + new Date().toLocaleString());
});


const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Vocatask Task Management API',
            version: '1.0.0',
            description: 'API documentation for Task Management System'
        },
        servers: [
            {
                url: `${beUrl}:${port}`,
                description: 'Development server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: ['./src/routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

app.use(errorHandler);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Swagger documentation available at ${beUrl}:${port}/docs`);
});