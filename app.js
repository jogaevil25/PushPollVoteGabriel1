const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

//DB config
require('./config/db');

const app = express();

const poll = require('./routes/poll');

//set publuc folder
app.use(express.static(path.join(__dirname, 'public')));

//body parser middlewre
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//enable cors
app.use(cors());

app.use('/poll', poll);

const port = 3000;


//star server 
app.listen(port, () => console.log(`Server started on port ${port}`));