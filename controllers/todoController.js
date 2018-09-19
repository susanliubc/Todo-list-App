const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Connect to mongoDB
mongoose.connect('mongodb://test:testm1@ds259732.mlab.com:59732/todo', {useNewUrlParser: true});

//Create a schema
const todoSchema = new mongoose.Schema({
  item: 'string'
});

//Create a model type
const Todo = mongoose.model('Todo', todoSchema);

/*let itemOne = Todo({item: 'buy flowers'}).save(function(err) {
  if(err) throw err;
  console.log('item saved');
}); 
let data=[{item: 'get milk'},{item: 'walk dog'},{item: 'start code'}]; */

let urlencodedParser = bodyParser.urlencoded({extended:false});

module.exports = function(app) {
  app.get('/todo',function(req,res){
    //get data from mongoDB and pass it to view
    Todo.find({}, function(err, data) {
      if(err) throw err;
      res.render('todo',{todos: data});
    });
  });

  app.post('/todo', urlencodedParser,function(req,res) {
    //get data from view and add it to mongoDB
    let newTodo = Todo(req.body).save(function(err, data) {
      if(err) throw err;
      res.json(data);
    });   
  });

  app.delete('/todo/:item', function(req, res) {
    //delete the requested item from mongoDB
    Todo.find({item: req.params.item.replace(/\-/g,' ')}).deleteOne(function(err,data) {
      if(err) throw err;
      res.json(data);
    });
  }); 
};
