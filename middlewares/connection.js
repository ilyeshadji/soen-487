const mysql_connector = require('mysql2');

let connection;

const startConnection = async (req, res, next) => {
    connection = mysql_connector.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        charset: 'utf8mb4',
    });

    connection.connect((err) => {
        console.error('Error Connecting:' + err.stack);

        connection.end();

        return;
    });

    console.log('Connected');

    next();
};

const endConnection = () => {
    connection.end((err) => console.error(err));

    console.log('Connection ended');
};

exports.startConnection = startConnection;
exports.endConnection = endConnection;
exports.connection = connection;
