const mysql = require('mysql2/promise');

const startConnection = async (req, res, next) => {
    return mysql.createConnection({
        host: 'localhost', // process.env.DB_HOST
        user: 'root',
        database: 'book inventory',
        password: 'password',
    });
};

const closeConnection = (connection) => {
    connection.end();
};

async function getBooksJob() {
    let connection;

    try {
        connection = await startConnection();
        const [rows, fields] = await connection.execute('SELECT * FROM book');
        return rows;
    } catch (error) {
        console.log(error.message);
        console.error('Error fetching books:', error.message);
    } finally {
        closeConnection(connection);
    }
}

async function createBookJob({ name, author, year }) {
    let connection;

    try {
        connection = await startConnection();
        const [result, fields] = await connection.execute(
            `INSERT INTO book (name, author, year) VALUES (?, ?, ?)`,
            [name, author, year]
        );

        // TODO: return book
        return { id: result.insertId, name, author, year }; // Check if the insertion was successful
    } catch (error) {
        console.error('Error creating book:', error.message);
        return false;
    } finally {
        closeConnection(connection);
    }
}

async function deleteBookJob(bookId) {
    let connection;

    try {
        connection = await startConnection();
        const [result, fields] = await connection.execute(
            `DELETE FROM book WHERE id = ?`,
            [bookId]
        );

        return result.affectedRows === 1; // Check if the deletion was successful
    } catch (error) {
        console.error('Error deleting book:', error.message);
        return false;
    } finally {
        closeConnection(connection);
    }
}

async function updateBookJob(fieldName, newValue, bookId) {
    let connection;

    try {
        connection = await startConnection();
        const [result, fields] = await connection.execute(
            `UPDATE book SET ${fieldName} = ? WHERE id = ?`,
            [newValue, bookId]
        );

        // TODO: return updated book
        return result.affectedRows === 1; // Check if the update was successful
    } catch (error) {
        console.error('Error updating book field:', error.message);
        return false;
    } finally {
        closeConnection(connection);
    }
}

exports.getBooksJob = getBooksJob;
exports.createBookJob = createBookJob;
exports.deleteBookJob = deleteBookJob;
exports.updateBookJob = updateBookJob;
