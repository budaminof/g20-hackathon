var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')['development']);
var bcrypt = require('bcryptjs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/new', (req, res) => {

    var errorArray = [];
    if (!req.body.username) {
        errorArray.push('Please enter a name');
    }
    if (!req.body.email) {
        errorArray.push('Please enter an email');
    }
    if (!req.body.password) {
        errorArray.push('Please enter a password');
    }
    if (!req.body.confirm) {
        errorArray.push('Please confirm password');
    }

    if(errorArray.length > 0) {
        res.render('signup', {errors: errorArray});
    } else if (req.body.username && req.body.email && req.body.password && req.body.confirm) {

    knex('users')
        .where({username:req.body.username.toLowerCase()})
            .then(function(response) {
                if (response.length > 0) {
                    res.render('signup', {
                        error: 'that username already exists in the database'
                    });
                } else {
                    var hash = bcrypt.hashSync(req.body.password, 8);
                    knex('users')
                        .insert({username: req.body.username.toLowerCase(), email: req.body.email, password:hash})
                        .then(function() {
                            res.redirect('/people');//WHERE???
                        })
                }
            })
    }
});


module.exports = router;
