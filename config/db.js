const mongoose = require('mongoose');

//map globl promises
mongoose.Promise = global.Promise;
//mongoose connect
mongoose.connect('mongodb+srv://gabo:gabo@cluster0-yfqtv.mongodb.net/test?retryWrites=true&w=majority')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));