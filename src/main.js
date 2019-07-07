const api = require('./booksApi');
const Table = require('./table');
const popup = require('./popup');
const formController = require('./formController');

const tableApi = new Table(null,null,onCheckboxClick, onEditBook); // ! too many args

var selectedRows = [];

// event handlers adding

const $addBookButton = document.getElementById('addBookButton');
$addBookButton.addEventListener('click',onAddBook);

const $form = document.getElementById('form');
$form.onsubmit = onFormSubmit;

const $cancelFormButton = document.getElementById('cancelButton');
$cancelFormButton.addEventListener('click',onPopupClose);

const $removeSelectedButton = document.getElementById('removeSelectedBooks');
$removeSelectedButton.addEventListener('click',onRemoveItems);

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

  document.getElementById('publisher').setAttribute('disabled','true');
  document.getElementById('quantity').setAttribute('disabled','true');

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

function onCheckboxClick(e){
  const id = e.target.attributes.bookId.value

  let itemIndex = selectedRows.findIndex(rowId => {
    return rowId === id;
  })

  if(itemIndex >= 0){
    console.log('found one');
    selectedRows.splice(itemIndex,1);
  } else {
    selectedRows.push(id);
  }

  initRemoveButton();

}

function initRemoveButton() {
  const $removeButton = document.getElementById('removeSelectedBooks');
  if (selectedRows.length > 0) {
    $removeButton.removeAttribute('disabled');
    $removeButton.innerText = `Remove ${selectedRows.length} items`;
  }
  else {
    $removeButton.innerText = 'Remove selected';
    $removeButton.setAttribute('disabled', 'true');
  }
}

function onRemoveItems(){
  api.deleteBooks(selectedRows).then(
    (res)=>{
      console.log(res);
      init();
      selectedRows = [];
      initRemoveButton();
    },
    (err)=>{
      alert('an error occured, try again later',err);
    })
}

