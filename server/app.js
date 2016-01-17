var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var multer     = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded


/****************************************
Database
 *****************************************/
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'gashland1234',
    database: 'GoodViews'
});

/****************************************
 Routes
 *****************************************/

connection.connect();
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT PATCH, DELETE, UPDATE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');

    res.setHeader('Access-Control-Allow-Credintails', true);

    next();
});



app.get('/users', function (req, res) {
    var user_name = req.query.userName;
    var password = req.query.password;
    var authenticate = "select * from user where user_name ='"+ user_name +"' AND password = '"+ password + "'";

    console.log(authenticate);

    connection.query(authenticate, function (err, rows, fields) {
        console.log('error', err);
        if (err) throw err;

        console.log('rows: ', rows);
        if (rows.length === 0){
            console.log('');
            res.status(304).send('YOU SHALL NOT PASS');
            return;
        }
        res.send(rows);

    });
});

app.post('/users', function (req, res) {
    var user = req.query;

    console.log(user);

    var addUser ="INSERT INTO user (user_name, password, first_name, last_name, email) VALUES ('" + user.user_name + "', '"
        + user.password + "', '" + user.first_name + "', '" + user.last_name + "', '" + user.email + "')";
    console.log(addUser);

    connection.query(addUser, function (err, rows, fields) {
        if (err) throw err;
        res.send(rows);

    });
});
//
//app.update('/users', function (req, res) {
//    console.log(req);
//    connection.query('SELECT * FROM user', function (err, rows, fields) {
//        if (err) throw err;
//        res.send(rows);
//
//    });
//});






app.listen(3000, function () {
    console.log('server is listening on port 3000!');
});