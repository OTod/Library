console.log('document is ready');

const api = require('./booksApi');
const tableApi = require('./table');
const popup = require('./popup');



// event handlers adding

const $addBookButton = document.getElementById('addBookButton');
$addBookButton.addEventListener('click',onAddBook);


api.fetchBooks().then(
  (books)=>{
    tableApi.data = books;
    tableApi.buildTable();
  },
  (error)=>{
    alert('sorry, an error occurerd', error);
  })

  function onAddBook(e){
    console.log('book adding!!',e);
    popup.open();
  }