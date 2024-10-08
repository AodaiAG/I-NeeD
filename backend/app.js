const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');  // Added path for serving static files
const sequelize = require('./config/db'); // Import Sequelize instance
const { sendVerificationCode, verifyCode } = require('./controllers/phoneController'); // Import controllers
const { search } = require('./controllers/searchController'); // Import controllers
const cors = require('cors');
const routes = require('./routes/api'); // Adjust the path
// Create an Express app
const app = express();

// Middleware for parsing JSON request bodies
app.use(bodyParser.json());

app.use(cors());

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, '../frontend/build')));

// API Routes
//app.get('/api/search', search); // Search route
//app.post('/api/phone/verify', sendVerificationCode); // Send verification code
//app.post('/api/phone/verify-code', verifyCode); // Verify phone code
app.use('/api', routes);

// Handle any other routes and send the React frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Start the server and connect to the database
const PORT = 3001; // Fixed port

// Sync the database models and start the server
sequelize.sync()
    .then(() => {
        console.log('Database synced successfully.');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error syncing the database:', err);
    });

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    res.status(500).json({ success: false, message: 'An internal error occurred.' });
});
