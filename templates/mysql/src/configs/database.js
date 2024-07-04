const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

/* Connection information via environment variables */
const connection = mysql.createConnection ({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE_DB
});

/* Export the connection */
module.exports = connection;