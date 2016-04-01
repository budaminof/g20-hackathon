var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')['development']);
var bcrypt = require('bcryptjs');

/* GET users listing. */
function authorizedUser(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/');
  }
}


router.get('/main',authorizedUser, function(req, res, next) {
    res.render('main');
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
                            res.redirect('/main');
                        })
                }
            })
    }
});

router.post('/login', function(req,res,next){

  knex('users')
  .where('email', '=', req.body.email.toLowerCase())
  .first()
  .then(function(response){
    if(response && bcrypt.compareSync(req.body.password, response.password)){
     req.session.user = response.username;
     req.session.id = response.id;
     req.session.email= response.email;

     res.redirect('/main');
    } else {
      res.render('login', {error: 'Invalid username or password'});
    }
  });
});

router.post('/gear', function (req, res, next){
    knex('users')
    .where({username: req.session.user})
    .then(function(response){
        knex('gear')
        .insert({
            owner_id: response[0].id,
            description: req.body.description,
            img_url: req.body.img_url
        })
        .then(function (res){
            res.render('main');
        })
    });

});

router.get('/logout', function(req, res) {
    res.clearCookie('session');
    res.redirect('/');
});



module.exports = router;
