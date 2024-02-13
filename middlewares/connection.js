const mysql_connector = require("mysql2");

let connection;

const startConnection = async (req, res, next) => {
  connection = mysql_connector.createConnection({
    host: "localhost",
    user: "root",
    password: "xxxx",
    database: "Book Inventory",
  });

  connection.connect();

  console.log("Connected");

  next();
};

const endConnection = () => {
  connection.end();

  console.log("Connection ended");
};

exports.startConnection = startConnection;
exports.endConnection = endConnection;
exports.connection = connection;
