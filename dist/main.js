/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/booksApi.js":
/*!*************************!*\
  !*** ./src/booksApi.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class LibraryAPI {\r\n  constructor(basicRoute) {\r\n    this.baseURL = basicRoute;\r\n  }\r\n\r\n  fetchBooks() {\r\n    return this.makeRequest(\"GET\", \"\");\r\n  }\r\n\r\n  getBook(id) {\r\n    return this.makeRequest(\"GET\", `/${id}`);\r\n  }\r\n\r\n  editBook(id, editedBook) {\r\n    return this.makeRequest(\"PUT\", `/${id}`, editedBook);\r\n  }\r\n\r\n  deleteBooks(idArr) {\r\n    return this.makeRequest(\"DELETE\", `/`, idArr);\r\n  }\r\n\r\n  addBook(newBook) {\r\n    return this.makeRequest(\"POST\", \"\", newBook);\r\n  }\r\n\r\n  makeRequest(method, route, data) {\r\n    return new Promise((resolve, reject) => {\r\n      let xhr = new XMLHttpRequest();\r\n      xhr.open(method, this.baseURL + route, true);\r\n      if (method === \"POST\" || method === \"PUT\" || method === \"DELETE\") {\r\n        xhr.setRequestHeader(\"Content-Type\", \"application/json\");\r\n      }\r\n      xhr.onload = () => {\r\n        if (xhr.status >= 200 && xhr.status < 300) {\r\n          resolve(JSON.parse(xhr.response));\r\n        } else {\r\n          reject(xhr.response);\r\n        }\r\n      };\r\n      xhr.onerror = e => {\r\n        reject(e);\r\n      };\r\n      data ? xhr.send(JSON.stringify(data)) : xhr.send();\r\n    });\r\n  }\r\n}\r\n\r\nmodule.exports = new LibraryAPI(\"http://localhost:4200/library\");\r\n\n\n//# sourceURL=webpack:///./src/booksApi.js?");

/***/ }),

/***/ "./src/formController.js":
/*!*******************************!*\
  !*** ./src/formController.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function getFormValues() {\r\n  const { elements } = document.forms[0];\r\n  const formData = {};\r\n  for (let n = 0; n < elements.length; n++) {\r\n    let element = elements[n];\r\n    if (element.tagName === \"INPUT\") {\r\n      formData[element.name] = element.value;\r\n    }\r\n  }\r\n  return formData;\r\n}\r\n\r\nfunction populateForm(book) {\r\n  for (let field in book) {\r\n    let $element = document.getElementById(field);\r\n    if ($element) {\r\n      $element.value = book[field];\r\n    }\r\n  }\r\n}\r\n\r\nmodule.exports = { getFormValues, populateForm };\r\n\n\n//# sourceURL=webpack:///./src/formController.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const api = __webpack_require__(/*! ./booksApi */ \"./src/booksApi.js\");\r\nconst Table = __webpack_require__(/*! ./table */ \"./src/table.js\");\r\nconst popup = __webpack_require__(/*! ./popup */ \"./src/popup.js\");\r\nconst formController = __webpack_require__(/*! ./formController */ \"./src/formController.js\");\r\n\r\nconst tableApi = new Table(null, null, onCheckboxClick, onEditBook);\r\n\r\nvar selectedRows = [];\r\n\r\nconst $addBookButton = document.getElementById(\"addBookButton\");\r\n$addBookButton.addEventListener(\"click\", onAddBook);\r\n\r\nconst $form = document.getElementById(\"form\");\r\n$form.onsubmit = onFormSubmit;\r\n\r\nconst $cancelFormButton = document.getElementById(\"cancelButton\");\r\n$cancelFormButton.addEventListener(\"click\", onPopupClose);\r\n\r\nconst $removeSelectedButton = document.getElementById(\"removeSelectedBooks\");\r\n$removeSelectedButton.addEventListener(\"click\", onRemoveItems);\r\n\r\nconst $filterInput = document.getElementById(\"filterInput\");\r\n$filterInput.addEventListener(\"input\", onFilteringChange);\r\n\r\nfunction init() {\r\n  api.fetchBooks().then(\r\n    books => {\r\n      tableApi.data = books;\r\n      tableApi.buildTable();\r\n    },\r\n    error => {\r\n      console.log(\"sorry, an error occurerd\", error);\r\n    }\r\n  );\r\n}\r\ninit();\r\n\r\nfunction onFormSubmit(event) {\r\n  event.preventDefault();\r\n  popup.onConfirm();\r\n}\r\n\r\nfunction onAddBook(e) {\r\n  popup.setOnConfirmCallback(onAddBookFormSubmit);\r\n  popup.open();\r\n}\r\n\r\nfunction onAddBookFormSubmit() {\r\n  api.addBook(formController.getFormValues()).then(\r\n    res => {\r\n      popup.close();\r\n      init();\r\n    },\r\n    err => {\r\n      console.log(\"some error occured!\", err);\r\n      popup.close();\r\n    }\r\n  );\r\n}\r\n\r\nfunction onEditBook(e) {\r\n  const id = e.target.attributes.bookId.value;\r\n\r\n  document.getElementById(\"publisher\").setAttribute(\"disabled\", \"true\");\r\n  document.getElementById(\"quantity\").setAttribute(\"disabled\", \"true\");\r\n\r\n  api.getBook(id).then(\r\n    res => {\r\n      popup.setOnConfirmCallback(onEditFormSubmit(id));\r\n      formController.populateForm(res);\r\n      popup.open();\r\n    },\r\n    err => {\r\n      console.log(\"Sorry, error occured. Please try again later\", err);\r\n      popup.close();\r\n    }\r\n  );\r\n}\r\n\r\nfunction onEditFormSubmit(id) {\r\n  return function() {\r\n    api.editBook(id, formController.getFormValues()).then(\r\n      res => {\r\n        init();\r\n        popup.close();\r\n      },\r\n      err => {\r\n        console.log(\"some error occured, please try again later\");\r\n        popup.close();\r\n      }\r\n    );\r\n  };\r\n}\r\n\r\nfunction onPopupClose() {\r\n  popup.close();\r\n}\r\n\r\nfunction onCheckboxClick(e) {\r\n  const id = e.target.attributes.bookId.value;\r\n\r\n  let itemIndex = selectedRows.findIndex(rowId => {\r\n    return rowId === id;\r\n  });\r\n\r\n  if (itemIndex >= 0) {\r\n    selectedRows.splice(itemIndex, 1);\r\n  } else {\r\n    selectedRows.push(id);\r\n  }\r\n\r\n  initRemoveButton();\r\n}\r\n\r\nfunction initRemoveButton() {\r\n  const $removeButton = document.getElementById(\"removeSelectedBooks\");\r\n  if (selectedRows.length > 0) {\r\n    $removeButton.removeAttribute(\"disabled\");\r\n    $removeButton.innerText = `Remove ${selectedRows.length} items`;\r\n  } else {\r\n    $removeButton.innerText = \"Remove selected\";\r\n    $removeButton.setAttribute(\"disabled\", \"true\");\r\n  }\r\n}\r\n\r\nfunction onRemoveItems() {\r\n  api.deleteBooks(selectedRows).then(\r\n    res => {\r\n      init();\r\n      selectedRows = [];\r\n      initRemoveButton();\r\n    },\r\n    err => {\r\n      console.log(\"an error occured, try again later\", err);\r\n    }\r\n  );\r\n}\r\n\r\nfunction onFilteringChange(e) {\r\n  tableApi.filterData(e.target.value);\r\n  setTimeout(() => {\r\n    tableApi.buildTable();\r\n  }, 700);\r\n}\r\n\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/popup.js":
/*!**********************!*\
  !*** ./src/popup.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Popup {\r\n  constructor() {\r\n    this.onConfirm = function() {\r\n      throw \"No confirmation function provided\";\r\n    };\r\n    this.$popup = document.getElementById(\"popup\");\r\n  }\r\n\r\n  open() {\r\n    this.$popup.classList.replace(\"hidden\", \"shown\");\r\n  }\r\n\r\n  close() {\r\n    this.$popup.classList.replace(\"shown\", \"hidden\");\r\n\r\n    document.getElementById(\"publisher\").removeAttribute(\"disabled\");\r\n    document.getElementById(\"quantity\").removeAttribute(\"disabled\");\r\n\r\n    document.forms[0].reset();\r\n  }\r\n\r\n  setOnConfirmCallback(func) {\r\n    this.onConfirm = func;\r\n  }\r\n}\r\n\r\nmodule.exports = new Popup();\r\n\n\n//# sourceURL=webpack:///./src/popup.js?");

/***/ }),

/***/ "./src/table.js":
/*!**********************!*\
  !*** ./src/table.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Table {\r\n  constructor(data = [], tableColumsData, onCheckboxClick, onEditBook) {\r\n    this.tableData = data;\r\n    this.source = data;\r\n\r\n    this.onCheckboxClick =\r\n      onCheckboxClick ||\r\n      function() {\r\n        throw \"No checkbox click event handler provided\";\r\n      };\r\n\r\n    this.onEditBook =\r\n      onEditBook ||\r\n      function() {\r\n        throw \"No edit button click event handler provided\";\r\n      };\r\n\r\n    this.tableColumnsOrderArray = tableColumsData || {\r\n      checkbox: null,\r\n      price: \"Price\",\r\n      name: \"Name\",\r\n      author: \"Author\",\r\n      publisher: \"Publishing House\",\r\n      quantity: \"Quantity\",\r\n      pagesCount: \"Pages Count\",\r\n      publishingYear: \"Publishing Year\",\r\n      genre: \"Genre\",\r\n      editButton: null\r\n    };\r\n\r\n    this.sortData = this.sortData.bind(this);\r\n  }\r\n\r\n  set data(data) {\r\n    this.tableData = data;\r\n    this.source = data;\r\n  }\r\n\r\n  sortData(e) {\r\n    const { sortParam } = e.target;\r\n\r\n    this.tableData = this.tableData.sort(function(a, b) {\r\n      if (a[sortParam] > b[sortParam]) {\r\n        return 1;\r\n      }\r\n      if (a[sortParam] < b[sortParam]) {\r\n        return -1;\r\n      }\r\n      return 0;\r\n    });\r\n\r\n    this.buildTable();\r\n\r\n    [...document.getElementsByTagName(\"th\")].forEach(node => {\r\n      if (node.sortParam === sortParam) {\r\n        node.classList.add(\"highlighted\");\r\n      } else {\r\n        node.classList.remove(\"highlighted\");\r\n      }\r\n    });\r\n  }\r\n\r\n  filterData(value) {\r\n    this.tableData = this.source.filter(book => {\r\n      let { name, author } = book;\r\n      return (\r\n        name.toLowerCase().includes(value.toLowerCase()) ||\r\n        author.toLowerCase().includes(value.toLowerCase())\r\n      );\r\n    });\r\n    if (!value) {\r\n      this.tableData = this.source;\r\n    }\r\n  }\r\n\r\n  buildTable() {\r\n    let $table = document.getElementById(\"table\");\r\n    $table.innerHTML = \"\";\r\n    let $headerRow = document.createElement(\"tr\");\r\n    for (let columnName in this.tableColumnsOrderArray) {\r\n      let $header = document.createElement(\"th\");\r\n      $header.innerText = this.tableColumnsOrderArray[columnName];\r\n      $header.onclick = this.sortData;\r\n      $header.sortParam = columnName;\r\n      $headerRow.appendChild($header);\r\n    }\r\n    $table.appendChild($headerRow);\r\n\r\n    this.tableData.forEach(element => {\r\n      let $row = document.createElement(\"tr\");\r\n      $row.setAttribute(\"bookId\", element.id);\r\n      $row.classList.add(\"table-row\");\r\n      for (let columnName in this.tableColumnsOrderArray) {\r\n        let $cell = document.createElement(\"td\");\r\n        switch (columnName) {\r\n          case \"checkbox\":\r\n            let $checkbox = document.createElement(\"input\");\r\n            $checkbox.setAttribute(\"type\", \"checkbox\");\r\n            $checkbox.setAttribute(\"bookId\", element.id);\r\n            $checkbox.addEventListener(\"click\", this.onCheckboxClick);\r\n            $cell.appendChild($checkbox);\r\n            break;\r\n          case \"editButton\":\r\n            let $editButton = document.createElement(\"button\");\r\n            $editButton.setAttribute(\"id\", \"editButton\");\r\n            $editButton.setAttribute(\"bookId\", element.id);\r\n            $editButton.innerText = \"Edit\";\r\n            $editButton.addEventListener(\"click\", this.onEditBook);\r\n            $cell.appendChild($editButton);\r\n\r\n            break;\r\n          default:\r\n            $cell.innerText = element[columnName];\r\n        }\r\n\r\n        $cell.classList.add(\"table-cell\");\r\n        $row.appendChild($cell);\r\n      }\r\n\r\n      $table.appendChild($row);\r\n    });\r\n  }\r\n}\r\n\r\nmodule.exports = Table;\r\n\n\n//# sourceURL=webpack:///./src/table.js?");

/***/ }),

/***/ 0:
/*!************************************************************************************!*\
  !*** multi ./src/main.js ./src/booksApi.js ./src/table.js ./src/formController.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! D:\\Pr\\test\\Library/src/main.js */\"./src/main.js\");\n__webpack_require__(/*! D:\\Pr\\test\\Library/src/booksApi.js */\"./src/booksApi.js\");\n__webpack_require__(/*! D:\\Pr\\test\\Library/src/table.js */\"./src/table.js\");\nmodule.exports = __webpack_require__(/*! D:\\Pr\\test\\Library/src/formController.js */\"./src/formController.js\");\n\n\n//# sourceURL=webpack:///multi_./src/main.js_./src/booksApi.js_./src/table.js_./src/formController.js?");

/***/ })

/******/ });