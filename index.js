const express = require('express')
    , routes = require('./routes')
    , path = require('path'),
        fileUpload = require('express-fileupload'),
        app = express(),
        mysql = require('mysql'),
        bodyParser = require('body-parser');
const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'Gray27june',
    database :'node'
})

connection.connect();

global.db = connection;


app.set('port',process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(fileUpload());


app.get('/', routes.index);
app.post('/', routes.index);
app.post('/profile/.id', routes.profile);
app.listen(8080)