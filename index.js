const express = require('express');

const app = express();

const lib = require('./routes/library');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/library', lib);

app.listen(4200, () => {console.log('Listening to port 4200...')});