const express = require("express");
const Joi = require("joi");

const router = express.Router();
const Library = require("../data_mock/books");

const lib = new Library();

const itemsPerPage = 3;

router.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

router.get("/", (req, res) => {
  res.send(lib.getBooks());
});

router.get("/pages", (req, res) => {
  const { pageNum } = req.query;
  const {filterParam} = req.query;
  const books = booksFilter(filterParam, lib.getBooks());
  const pagesAmount = Math.ceil( books.length / itemsPerPage );
  const requiredBooks = books.slice( ( itemsPerPage * ( pageNum - 1 ) ), itemsPerPage + ( itemsPerPage * ( pageNum - 1 ) ) );
  res.send( { requiredBooks, pagesAmount, pageNum } );
});

router.get("/:id", (req, res) => {
  let book = lib.getBooks().find(item => {
    return item.id === parseInt(req.params.id);
  });
  if (!book)
    return res
      .status(400)
      .send("Sorry, there are no such book in the library.");

  res.send(book);
});

router.post("/", (req, res) => {
  const { error } = validatePostReq(req.body);
  if (error)
    return res.status(400).send(error.name + ": " + error.details[0].message);

  const newBook = {
    id: lib.getBooks().length + 1,
    ...req.body
  };

  lib.addNewBook(newBook);

  res.send(lib.getBooks());
});


router.put("/:id", (req, res) => {
  let book = lib.getBooks().find(item => {
    return item.id === parseInt(req.params.id);
  });

  if (!book) return res.status(400).send("Sorry, there are no such item!");

  const { error } = validatePutReq(req.body);
  if (error)
    return res.status(400).send(error.name + ": " + error.details[0].message);

  lib.update(book.id, req.body);
  res.send({ ...book, ...req.body });
});

router.delete("/", (req, res) => {
  const idsToDelete = req.body;
  const idsValid = idsToDelete.filter(id =>
    lib.getBooks().some(book => parseInt(book.id) === id)
  );

  if (idsValid.length) {
    return res
      .status(400)
      .send("Sorry, you have indicated not existing in library books.");
  }

  lib.removeBooks(idsToDelete);

  res.send(lib.getBooks());
});

function validatePostReq(obj) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    author: Joi.string()
      .min(3)
      .required(),
    publisher: Joi.string()
      .min(3)
      .required(),
    quantity: Joi.number()
      .greater(0)
      .required(),
    price: Joi.number()
      .greater(0)
      .required(),
    pagesCount: Joi.optional(),
    publishingYear: Joi.optional(),
    genre: Joi.optional()
  };
  return Joi.validate(obj, schema);
}

function validatePutReq(obj) {
  const schema = {
    name: Joi.string().min(3),
    author: Joi.string().min(3),
    price: Joi.number().greater(0),
    pagesCount: Joi.optional(),
    publishingYear: Joi.optional(),
    genre: Joi.optional(),

    publisher: Joi.string().min(3),
    quantity: Joi.number().greater(0)
  };
  return Joi.validate(obj, schema);
}

function booksFilter(filterParam, input) {
  if (!filterParam) {
    return input;
  }
  return input.filter(book => {
    let { name, author } = book;
    return (
      name.toLowerCase().includes(filterParam.toLowerCase()) ||
      author.toLowerCase().includes(filterParam.toLowerCase())
    );
  });
}

module.exports = router;
