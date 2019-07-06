console.log('document is ready');

const api = require('./booksApi');

api.fetchBooks().then(
  (books)=>{
    console.log(books);
  },
  (error)=>{
    console.log(error);
  })