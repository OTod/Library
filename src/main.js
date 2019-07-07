const api = require('./booksApi');
const Table = require('./table');
const popup = require('./popup');
const formController = require('./formController');

const tableApi = new Table(null,null,null, onEditBook); // ! too many args

// event handlers adding

const $addBookButton = document.getElementById('addBookButton');
$addBookButton.addEventListener('click',onAddBook);

const $form = document.getElementById('form');
$form.onsubmit = onFormSubmit;

const $cancelFormButton = document.getElementById('cancelButton');
$cancelFormButton.addEventListener('click',onPopupClose);

//////////////////////////////////////////////////////
function init(){
  api.fetchBooks().then(
    (books)=>{
      tableApi.data = books;
      tableApi.buildTable();
    },
    (error)=>{
      alert('sorry, an error occurerd', error); // !change to displayed message instead a table
    })
}
init();



function onFormSubmit(event){
  event.preventDefault();
  popup.onConfirm();
  
}

function onAddBook(e){
  popup.setOnConfirm(onAddFormSubmit)
  popup.open();
}

 // ! maybe this callback should be 
function onAddFormSubmit(){
  console.log('another submit!!');
  api.addBook(formController.getFormValues()).then(
    (res)=>{
      popup.close();
      init();
    }, 
    (err)=>{
      alert('some error occured!', err);
      popup.close();
    })
}


function onEditBook(e){
  console.log(e.target.attributes.bookId.value);
  popup.setOnConfirm(onEditFormSubmit)
  popup.open();
}

function onEditFormSubmit(){
  console.log('another edit submit!!');
}

function onPopupClose(){
  popup.close();
}

