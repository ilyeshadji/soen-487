const { endConnection, connection } = require('../middlewares/connection');
const HttpError = require('../models/http-error');

//use fs functions for now until db set up works 
const fs = require('fs');

//should be fetching from a database but for now get from the json file
let books = JSON.parse(fs.readFileSync('./data/books.json'));

const createBook = async (req, res, next) => {
    //need to implement the mysql2 still
    //newid autoincrement 
    const newId = books[books.length * 1] + 1;
    //getting the object from the request 
    const newBook = Object.assign({id: newId},req.body);

    books.push(newBook);

    fs.writeFile('./data/books.json', JSON.stringify(books));
    res.status(200).json({ 
        status: "sucess",
        message: 'created',
        data:{
            book:newBook
        }
    });
};

const getBook = async (req, res, next) => {
    res.status(200).json({ 
        status: "sucess",
        count:books.length,
        data: {
            books:  books
        }
    });
};

const deleteBook = async (req, res, next) => {
    const id = req.param.id * 1;
    const bookToDelete = books.find(ei => ei.id === id);

    if(!bookToDelete){
        return res.status(404).json({
            status:'fail',
            message: 'No Book object found with ID '+ id +' is found to delete!'
        })
    }
    
    const index = books.indexOf(bookToDelete);

    //get the first parameter 
    books.splice(index,1);

    //write it to the data file/database 
    fs.writeFile('./data/books.json', JSON.stringify(books));
    res.status(200).json({
            message: `Book with id ${req.params.id} deleted`,
        });
    

};

const updateBook = async (req, res, next) => {

    let id = req.params.id * 1;
    //again need to implement the mysql2 instead of fetching from the json
    let bookToUpdate = books.find(ei =>ei.id === id);

    if(!bookToUpdate){
        return res.status(404).json({
            status:'fail',
            message: 'No Book object found with ID '+ id +' is found to update!'
        })
    }
    let index = book.indexOf(bookToUpdate); //e.g : id = 4 , index = 3 

    Object.assign(bookToUpdate,req.body);

    books[index] = bookToUpdate;

    fs.writeFile('./data/books.json', JSON.stringify(books));

    res.status(200).json({ message: `Book with id ${req.params.id} updated ` });
};

exports.createBook = createBook;
exports.getBook = getBook;
exports.deleteBook = deleteBook;
exports.updateBook = updateBook;
