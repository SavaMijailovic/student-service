const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/Fakultet', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.set('view engine', 'ejs');
app.set('views', './views/');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.use('/prijava', require('./routes/prijava'));
app.use('/student', require('./routes/student'));
app.use('/exams', require('./routes/exam'));
app.use('/results', require('./routes/results'))

// error
app.use(function (err, req, res, next) {
    let message = err.message;
    const statusCode = err.status || 500;
    
    if (message.indexOf('@') == 0) {
        message = message.slice(1, message.length);
        return res.render('error.ejs', {message: message});
    }

    console.log('\nError on server:', message);
    console.log('\nStack:\n', err.stack);
    return res.status(statusCode).render('error.ejs', {message: 'Greška na serveru'});
});

// not found
app.use('/', function (req, res, next) {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

module.exports = app;