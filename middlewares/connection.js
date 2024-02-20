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

async function getBooksJob(){
    const connection = startConnection;
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM book');
        return rows;
    } catch (error) {
        console.error('Error fetching books:', error.message);
    } finally {
        await connection.end();
    }
}
async function createBookJob(){
    const connection = startConnection;
    try {
        const [result, fields] = await connection.execute(
            `INSERT INTO book (name, author, year) VALUES (?, ?, ?)`,
            [name, author, year]
        );
        return result.affectedRows === 1; // Check if the insertion was successful
    } catch (error) {
        console.error('Error creating book:', error.message);
        return false;
    } finally {
        await connection.end();
    }
}
async function deleteBookJob(){
    const connection = startConnection;
    try {
        const [result, fields] = await connection.execute(
            `DELETE FROM book WHERE id = ?`,
            [bookId]
        );
        return result.affectedRows === 1; // Check if the deletion was successful
    } catch (error) {
        console.error('Error deleting book:', error.message);
        return false;
    } finally {
        await connection.end();
    }
}
async function updateBookJob(){
    const connection = startConnection;
    try {
        const [result, fields] = await connection.execute(
            `UPDATE book SET ${fieldName} = ? WHERE id = ?`,
            [newValue, bookId]
        );
        return result.affectedRows === 1; // Check if the update was successful
    } catch (error) {
        console.error('Error updating book field:', error.message);
        return false;
    } finally {
        await connection.end();
    }
}
exports.startConnection = startConnection;
exports.getBooksJob = getBooksJob;
exports.createBookJob = createBookJob;
exports.deleteBookJob = deleteBookJob;
exports.updateBookJob = updateBookJob;
exports.endConnection = endConnection;
exports.connection = connection;
