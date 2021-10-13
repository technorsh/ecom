const express = require('express');
const ejs = require("ejs");
const bodyParser = require('body-parser');

const user = require('./routes/user.js');
const book = require('./routes/book.js');
const admin = require('./routes/admin.js');

var app = express();
var cors = require('cors')

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const port = process.env.PORT || 3000;

app.use('/user', user);
app.use('/book', book);
app.use('/admin',admin);

app.listen(port, (req,res) => {
        console.log("Server is running ....");
    })