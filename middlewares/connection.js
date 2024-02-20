const mysql = require('mysql2');

const startConnection = async (req, res, next) => {
    return mysql.createConnection({
        host: 'localhost', // process.env.DB_HOST
        user: 'root',
        database: 'password',
    });
};

async function getBooksJob() {
    const connection = await startConnection;
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM book');
        return rows;
    } catch (error) {
        console.error('Error fetching books:', error.message);
    }
}

async function createBookJob() {
    const connection = await startConnection;
    try {
        const [result, fields] = await connection.execute(
            `INSERT INTO book (name, author, year) VALUES (?, ?, ?)`,
            [name, author, year]
        );
        return result.affectedRows === 1; // Check if the insertion was successful
    } catch (error) {
        console.error('Error creating book:', error.message);
        return false;
    }
}

async function deleteBookJob() {
    const connection = await startConnection;
    try {
        const [result, fields] = await connection.execute(
            `DELETE FROM book WHERE id = ?`,
            [bookId]
        );
        return result.affectedRows === 1; // Check if the deletion was successful
    } catch (error) {
        console.error('Error deleting book:', error.message);
        return false;
    }
}

async function updateBookJob() {
    const connection = await startConnection;
    try {
        const [result, fields] = await connection.execute(
            `UPDATE book SET ${fieldName} = ? WHERE id = ?`,
            [newValue, bookId]
        );
        return result.affectedRows === 1; // Check if the update was successful
    } catch (error) {
        console.error('Error updating book field:', error.message);
        return false;
    }
}

exports.getBooksJob = getBooksJob;
exports.createBookJob = createBookJob;
exports.deleteBookJob = deleteBookJob;
exports.updateBookJob = updateBookJob;