let express = require('express');
let todoController = require('./controllers/todoController');
let app = express();

//Set up template engine
app.set('view engine','ejs');

//Static files
app.use(express.static('./public'));

//Fire controller
todoController(app);

//Listen to port
app.listen(3000);
console.log('You are listening to port 3000');