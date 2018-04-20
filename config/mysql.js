const mysql = require('mysql2');
function connect() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'kulturhuset'
    });
}

module.exports = {
    connect
}