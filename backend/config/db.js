const { Sequelize } = require('sequelize');

// Sequelize instance connecting to MySQL
const sequelize = new Sequelize('ineed', 'superadmin', 'Server@Work', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,        // Ensure this port matches your MySQL setup
    logging: console.log // Log SQL queries to the console for debugging
});

// Test the database connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection to the local database has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the local database:', err);
    });

module.exports = sequelize;
