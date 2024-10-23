const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

public_users.get('/', function (req, res) {
    new Promise((resolve, reject) => {
        if (books && Object.keys(books).length > 0) {  // Check if books is not empty
            resolve(books);
        } else {
            reject("No book is available");
        }
    }).then(
        (books) => res.send(JSON.stringify(books, null, 4)), // Use res.json to send JSON response directly
        (error) => res.send(error) // Send 404 status on error
    );
});


// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;

    new Promise((resolve, reject) => {
        const book = books[isbn];
        if (book) {
            resolve(book);
        } else {
            reject("Book not found");
        }
    }).then(
        (book) => res.send(JSON.stringify(book, null, 4)),
        (error) => res.send(error)
    );
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
        const author = req.params.author;
        new Promise((resolve, reject) => {
            let result = {};
    
            for (let id in books) {
                if (books[id].author === author) {
                    result[id] = books[id];
                }
            }
    
            if (Object.keys(result).length > 0) {
                resolve(result);
            } else {
                reject("No books found for this author");
            }
        }).then(
            (books) => res.send(JSON.stringify(books, null, 4)),
            (error) => res.send(error)
        );
    });

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  new Promise((resolve, reject) => {
    let result = {};
  // Loop through each book in the books object
    for (let id in books) {
        // Check if the title matches
        if (books[id].title === title) {
            result[id] = books[id];
        }
    }
  
    if (Object.keys(result).length > 0) {
            resolve(result);
    } else {
        reject("No books found for this author");
    }
    }).then(
        (books) => res.send(JSON.stringify(books, null, 4)),
        (error) => res.send(error)
    );
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    
    res.send(books[isbn].reviews);
});

module.exports.general = public_users;
