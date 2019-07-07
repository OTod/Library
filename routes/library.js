const express = require('express');
const Joi = require('joi');

const router = express.Router();
const Library = require('../data_mock/books');

const lib = new Library();

router.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

router.get('/',(req,res) => {
    res.send(lib.getBooks());
})

router.post('/', (req,res) => {
    console.log('request body: \n',req.body);
    const { error } = validatePostReq(req.body);
    if(error) return res.status(400).send(error.name + ': ' + error.details[0].message);

    const newBook = {
        id: lib.getBooks().length+1,
        ...req.body
    }

    lib.addNewBook(newBook);

    res.send(lib.getBooks());
    
});

router.put('/:id', (req,res) => {
    let book = lib.getBooks().find((item) => {
        return item.id === parseInt(req.params.id)
    });

    if(!book) return res.status(400).send('Sorry, there are no such item!');

    const {error} = validatePutReq(req.body);
    if(error) return res.status(400).send(error.name + ': ' + error.details[0].message);

    lib.update(book.id, req.body);
    res.send({...book, ...req.body});
})

router.delete('/:id', (req,res) => {
    let book = lib.getBooks().find((item) => {
        return item.id === parseInt (req.params.id);
    });
    if(!book) return res.status(400).send('Sorry, there are no such book in the library.');

    lib.removeBook(book);
    
    res.send(lib.getBooks());
})


function validatePostReq ( obj ) {
    const schema = {
        name: Joi.string().min(3).required(),
        author: Joi.string().min(3).required(),
        publisher: Joi.string().min(3).required(),
        quantity: Joi.number().greater(0).required(),
        price: Joi.number().greater(0).required(),
        pagesCount: Joi.number().greater(0).required(),
        publishingYear : Joi.number().greater(1000).required(),
    }
    return Joi.validate(obj, schema);
}

function validatePutReq ( obj ) {
    const schema = {
        name: Joi.string().min(3),
        author: Joi.string().min(3),
        price: Joi.number().greater(0),
        pagesCount: Joi.number().greater(0),
        publishingYear : Joi.number().greater(1000),
    }
    return Joi.validate(obj, schema);
}

module.exports = router;