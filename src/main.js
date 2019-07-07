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
  popup.setOnConfirmCallback(onAddFormSubmit)
  popup.open();
}

function onAddFormSubmit(){
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
  const id = e.target.attributes.bookId.value;

  $publisherInput = document.getElementById('publisher').setAttribute('disabled','true');
  $publisherInput = document.getElementById('quantity').setAttribute('disabled','true');

  api.getBook(id).then(
    (res)=>{
      console.log(res);
      popup.setOnConfirmCallback(onEditFormSubmit(id));
      formController.populateForm(res);
      popup.open();
    }, 
    (err)=>{
      alert('Sorry, error occured. Please try again later', err);
      popup.close();
    })
}

function onEditFormSubmit(id){

  return function(){
    console.log('another edit submit!!');
    api.editBook(id, formController.getFormValues()).then(
      (res)=>{
        console.log(res);
        init();
        popup.close();
      },
      (err)=>{
        alert('some error occured, please try again later');
        popup.close();
      })
  }

}

function onPopupClose(){
  popup.close();
}

