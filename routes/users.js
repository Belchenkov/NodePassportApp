var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('passportapp', ['users']);
var bcrypt = require('bcryptjs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Login Page - GET
router.get('/login', function(req, res){
    res.render('login');
});

// Register Page - GET
router.get('/register', function(req, res){
    res.render('register');
});

// Register - POST
router.post('/register', function(req, res){
    // Get Form Values
    var name     		= req.body.name;
    var email    		= req.body.email;
    var username 		= req.body.username;
    var password 		= req.body.password;
    var password2 		= req.body.password2;

    // Validation
    req.checkBody('name', 'Имя не может быть пустым').notEmpty();
    req.checkBody('email', 'Email не может быть пустым').notEmpty();
    req.checkBody('email', 'Введите корректный Email').isEmail();
    req.checkBody('username', 'Логин не может быть пустым').notEmpty();
    req.checkBody('password', 'Пароль не может быть пустым').notEmpty();
    req.checkBody('password2', 'Пароли не совпадают').equals(req.body.password);

    // Check for errors
    var errors = req.validationErrors();

    if(errors){
        console.log('Form has errors...');
        res.render('register', {
            errors: errors,
            name: name,
            email: email,
            username:username,
            password: password,
            password2: password2
        });
    } else {
        var newUser = {
            name: name,
            email: email,
            username:username,
            password: password,
        };

        db.users.insert(newUser, function (err, doc) {
            if (err) {
                res.send(err);
            } else {
                console.log('User Added ...');

                //Success Message
                req.flash('success', 'Вы зарегистрировались и можете войти !')

                //Redirect after register
                res.location('/');
                res.redirect('/');
            }
        });
    }
});

module.exports = router;