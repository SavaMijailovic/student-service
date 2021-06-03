const studentController = require('./student');

function login(req, res, next) {
    try {
        res.render('prijava.ejs', {
            passwordMatch: true,
            username: ''
        });
    } catch (err) {
        next(err);
    }
}

function passwordWarning(req, res, next) {
    try {
        res.render('prijava.ejs', {
            passwordMatch: false,
            username: req.params.username
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    login,
    passwordWarning
}