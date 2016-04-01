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

module.exports = router;
