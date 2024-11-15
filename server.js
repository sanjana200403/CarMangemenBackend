const express = require('express');
const connectDB = require('./Database/dbconnection'); 
const cors = require('cors');
require('./models/userModel')
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth')
const carRoutes = require('./routes/carRoutes')
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
dotenv.config();

// Middleware
app.use(express.json());  // Parse JSON bodies
app.use(cors());  // Enable CORS for all origins

// Connect to MongoDB
connectDB();
// Swagger SetUp
// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'Car Rental API',
        description: 'API for managing cars and user authentication',
        contact: {
          name: 'Sanjana',
          email: '03sanjana2004@gmail.com',
        },
        servers: ['http://localhost:5000'],
      },
    },
    apis: ['./routes/*.js'],
  };
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
// Your other routes and middlewares go here...

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
