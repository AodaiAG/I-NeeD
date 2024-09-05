const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db'); // Import Sequelize instance
const { sendVerificationCode, verifyCode, search } = require('./controllers'); // Import controllers

// Create an Express app
const app = express();

// Middleware for parsing JSON request bodies
app.use(bodyParser.json());

// Routes
app.get('/api/search', search); // Search route
app.post('/api/phone/verify', sendVerificationCode); // Send verification code
app.post('/api/phone/verify-code', verifyCode); // Verify phone code

// Start the server and connect to the database
const PORT = process.env.PORT || 3001;

sequelize.sync() // Sync models with database
    .then(() => {
        console.log('Database synced');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to sync database:', err);
    });
