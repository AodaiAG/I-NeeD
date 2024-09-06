const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');  // Added path for serving static files
const sequelize = require('./config/db'); // Import Sequelize instance
const { sendVerificationCode, verifyCode, search } = require('./controllers'); // Import controllers

// Create an Express app
const app = express();

// Middleware for parsing JSON request bodies
app.use(bodyParser.json());

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, '../frontend/build')));

// API Routes
app.get('/api/search', search); // Search route
app.post('/api/phone/verify', sendVerificationCode); // Send verification code
app.post('/api/phone/verify-code', verifyCode); // Verify phone code

// Handle any other routes and send the React frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

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
