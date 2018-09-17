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
app.listen(4567);
console.log('You are listening to port 4567');