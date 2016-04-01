var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    knex('users')
    .where({id: req.session.userID})
    .then(function(response){
        knex('gear')
        .
    })
  res.render('index', { title: 'Express' });
});

module.exports = router;
