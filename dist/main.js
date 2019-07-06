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

eval("class LibraryAPI {\r\n  constructor(basicRoute){\r\n\r\n    this.baseURL = basicRoute;\r\n  }\r\n\r\n  fetchBooks(){\r\n    return this.makeRequest('GET','');\r\n  }\r\n\r\n  editBook(id,editedBook){\r\n    return this.makeRequest('PATCH', `/${id}`, editedBook);\r\n  }\r\n\r\n  deleteBook(id){\r\n    return this.makeRequest('DELETE', `/${id}`);\r\n  }\r\n\r\n  addBook(newBook){\r\n    return this.makeRequest('POST', '', newBook);\r\n  }\r\n\r\n  makeRequest(method, route, data ){\r\n    return new Promise((resolve, reject) => {\r\n      let xhr = new XMLHttpRequest();\r\n      xhr.open(method,this.baseURL+route, true);\r\n      // xhr.setRequestHeader() // ! Here should be CORS policy header \r\n      // xhr.setRequestHeader('Access-Control-Allow-Origin','null');\r\n      // xhr.setRequestHeader('Access-Control-Allow-Credentials','true');\r\n      xhr.onload = () => {\r\n        if(this.status >= 200 || this.status >= 300 ) {\r\n          resolve(xhr.response); \r\n        } else {\r\n          reject(xhr.response);\r\n        }\r\n      }\r\n      xhr.onerror = () => {\r\n        reject(xhr.response);\r\n      }\r\n      data ? xhr.send(data) : xhr.send();\r\n    })\r\n  }\r\n}\r\n\r\nmodule.exports = new LibraryAPI('http://localhost:4200/library');\n\n//# sourceURL=webpack:///./src/booksApi.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("console.log('document is ready');\r\n\r\nconst api = __webpack_require__(/*! ./booksApi */ \"./src/booksApi.js\");\r\n\r\napi.fetchBooks().then(\r\n  (books)=>{\r\n    console.log(books);\r\n  },\r\n  (error)=>{\r\n    console.log(error);\r\n  })\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/script-3.js":
/*!*************************!*\
  !*** ./src/script-3.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("console.log('document 3 is ready');\n\n//# sourceURL=webpack:///./src/script-3.js?");

/***/ }),

/***/ 0:
/*!***************************************************************!*\
  !*** multi ./src/main.js ./src/booksApi.js ./src/script-3.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! E:\\Work and play_stockhouse\\Projects\\_2019\\Library/src/main.js */\"./src/main.js\");\n__webpack_require__(/*! E:\\Work and play_stockhouse\\Projects\\_2019\\Library/src/booksApi.js */\"./src/booksApi.js\");\nmodule.exports = __webpack_require__(/*! E:\\Work and play_stockhouse\\Projects\\_2019\\Library/src/script-3.js */\"./src/script-3.js\");\n\n\n//# sourceURL=webpack:///multi_./src/main.js_./src/booksApi.js_./src/script-3.js?");

/***/ })

/******/ });