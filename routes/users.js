var express = require('express');
var router = express.Router();

//Login Page - GET
router.get('/login', function (req, res) {
    res.send('<h1>LOGIN</h1>');
});

//Register Page - GET
router.get('/register', function (req, res) {
    res.send('<h1>REGISTER</h1>');
});

module.exports = router;