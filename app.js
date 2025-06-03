const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const swaggerUi = require('swagger-ui-express');
const db = require('./data/database');
const swaggerDocument = require('./swagger');
const routes = require('./routes');

dotenv.config();

const app = express();
const port = 8080;

// Middleware
app.use(cors()); 
app.use(bodyParser.json());

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Main routes
app.use('/', routes);

// 404 Handler
app.use((req, res, _next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error Handler
app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

// DB Init and Server Start
db.initDb((err) => {
  if (err) {
    console.error('Failed to connect to DB', err);
  } else {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  }
});