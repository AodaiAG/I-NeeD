const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dbname', 'user', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
