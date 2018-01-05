var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.json');

router.get('/', function (req, res) {
    res.render('register');
});

router.post('/', function (req, res) {
    // register using api to maintain clean separation between layers
    console.log('Password is ',req.body.password.toLowerCase());
    console.log('C Password is ',req.body.cpassword.toLowerCase());
    console.log('REQ is ',req.body.password.toLowerCase() === req.body.cpassword.toLowerCase());
    if(req.body.password.toLowerCase() === req.body.cpassword.toLowerCase()){
        request.post({
            url: config.apiUrl + '/users/register',
            form: req.body,
            json: true
        }, function (error, response, body) {
            if (error) {
                return res.render('register', { error: 'An error occurred' });
            }
    
            if (response.statusCode !== 200) {
                return res.render('register', {
                    error: response.body,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    username: req.body.username
                });
            }
    
            // return to login page with success message
            req.session.success = 'Registration successful';
            return res.redirect('/login');
        });
    }
    else{
        return res.render('register', { error: 'Passwords does not match' });
    }
});

module.exports = router;