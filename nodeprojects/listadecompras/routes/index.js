var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  global.db.findAll((err, docs) => {
    if(err){ return console.log(err) }
    res.render('index', {
      title: 'Lista de Compras',
      docs: docs
    });
  });
});

module.exports = router;
