var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')['development']);
var bcrypt = require('bcryptjs');

/* GET home page. */


router.get('/', function(req, res, next) {
    res.render('index', { title: 'gearSwap' });
});

// GET signup page
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'gearSwap' });
});

// GET login page
router.get('/login', function(req, res, next){
  res.render('login', { title: 'gearSwap' });
});

router.get('/main', function (req, res, next){
    knex('gear').leftJoin('users', 'gear.owner_id', 'users.id')
    .then(function(results){
        res.render('main', {stuff: results, name: req.session.user});
   })

});

module.exports = router;
