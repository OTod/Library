const api = require("./booksApi");
const Table = require("./table");
const popup = require("./popup");
const formController = require("./formController");
const pagination = require("./pagination");

const tableApi = new Table(null, null, onCheckboxClick, onEditBook);

var selectedRows = [];
var selectedPage = 1;
var filterParam = '';

const $addBookButton = document.getElementById("addBookButton");
$addBookButton.addEventListener("click", onAddBook);

const $form = document.getElementById("form");
$form.onsubmit = onFormSubmit;

const $cancelFormButton = document.getElementById("cancelButton");
$cancelFormButton.addEventListener("click", onPopupClose);

const $removeSelectedButton = document.getElementById("removeSelectedBooks");
$removeSelectedButton.addEventListener("click", onRemoveItems);

const $filterInput = document.getElementById("filterInput");
$filterInput.addEventListener("input", onFilteringChange);

function init() {
  api.fetchBooksByPage( selectedPage, filterParam ).then(
    booksData => {
      pagination.createPagination( booksData.pagesAmount, booksData.pageNum, onPaginationClick );
      tableApi.data = booksData.requiredBooks;
      tableApi.buildTable();
    },
    error => {
      console.log("sorry, an error occurerd", error);
    }
  );
}

init();

function onFormSubmit(event) {
  event.preventDefault();
  popup.onConfirm();
}

function onAddBook(e) {
  popup.setOnConfirmCallback(onAddBookFormSubmit);
  popup.open();
}

function onAddBookFormSubmit() {
  api.addBook(formController.getFormValues()).then(
    res => {
      popup.close();
      init();
    },
    err => {
      console.log("some error occured!", err);
      popup.close();
    }
  );
}

function onEditBook(e) {
  const id = e.target.attributes.bookId.value;

  document.getElementById("publisher").setAttribute("disabled", "true");
  document.getElementById("quantity").setAttribute("disabled", "true");

  api.getBook(id).then(
    res => {
      popup.setOnConfirmCallback(onEditFormSubmit(id));
      formController.populateForm(res);
      popup.open();
    },
    err => {
      console.log("Sorry, error occured. Please try again later", err);
      popup.close();
    }
  );
}

function onEditFormSubmit(id) {
  return function() {
    api.editBook(id, formController.getFormValues()).then(
      res => {
        init();
        popup.close();
      },
      err => {
        console.log("some error occured, please try again later");
        popup.close();
      }
    );
  };
}

function onPopupClose() {
  popup.close();
}

function onCheckboxClick(e) {
  const id = e.target.attributes.bookId.value;

  let itemIndex = selectedRows.findIndex(rowId => {
    return rowId === id;
  });

  if (itemIndex >= 0) {
    selectedRows.splice(itemIndex, 1);
  } else {
    selectedRows.push(id);
  }

  initRemoveButton();
}

function onPaginationClick (e){
  selectedPage = e.target.value;
  init();
}

function initRemoveButton() {
  const $removeButton = document.getElementById("removeSelectedBooks");
  if (selectedRows.length > 0) {
    $removeButton.removeAttribute("disabled");
    $removeButton.innerText = `Remove ${selectedRows.length} items`;
  } else {
    $removeButton.innerText = "Remove selected";
    $removeButton.setAttribute("disabled", "true");
  }
}

function onRemoveItems() {
  api.deleteBooks(selectedRows).then(
    res => {
      init();
      selectedRows = [];
      initRemoveButton();
    },
    err => {
      console.log("an error occured, try again later", err);
    }
  );
}

function onFilteringChange(e) {
  // tableApi.filterData(e.target.value);
  filterParam = e.target.value;
  setTimeout(() => {
    // tableApi.buildTable();
    init();
  }, 700);
}
