var express = require('express');
var router = express.Router();

router.get('/new', function(req, res, next) {
  res.render('items', {title: 'Novo Cadastro', item: {_id:'', nome:'', quantidade:0}});
});

router.get('/new/:id', function(req, res, next) {
  var id = req.params.id;
  global.db.findOne(id, (err, item) =>{
    if(err){ return console.log(err); }
      res.render('items', {title: 'Editar Cadastro', item});
  });
});

router.post('/save', function(req, res, next){
  const nome = req.body.nome;
  const quantidade = parseInt(req.body.quantidade);
  const id = req.body.id;
  if(id){
    global.db.updateOne(id, {nome, quantidade}, (err, result) => {
      if(err){ return console.log(err); }
      res.redirect('/');
    })
  }
  else{
    global.db.insert({nome, quantidade}, (err, result) => {
      if(err){ return console.log(err); }
      res.redirect('/');
    });
  } 
});

router.get('/delete/:id', function (req, res, next) {
  var id = req.params.id;
  global.db.deleteOne(id, (err, result) => {
    if (err) { return console.log(err); }
    res.redirect('/');
  });
});

module.exports = router;
