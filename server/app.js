var express    = require('express');
var app        = express();
var router     = express.Router();
var bodyParser = require('body-parser');
var multer     = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


/****************************************
 Database
 *****************************************/
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host:     'localhost',
    user:     'root',
    password: 'gashland1234',
    database: 'GoodViews'
});

/****************************************
 Routes
 *****************************************/

connection.connect();
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, UPDATE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');

    res.setHeader('Access-Control-Allow-Credintails', true);

    next();
});

app.get('/user/id', function (req, res) {
    var userId       = req.query.id;
    var authenticate = "select * from user where id ='" + userId + "'";


    connection.query(authenticate, function (err, rows, fields) {
        if (err) throw err;

        if (rows.length === 0) {
            res.status(304).send('YOU SHALL NOT PASS');
            return;
        }
        res.send(rows);

    });
});

app.get('/user', function (req, res) {
    var user_name    = req.query.userName;
    var password     = req.query.password;
    var authenticate = "select * from user where user_name ='" + user_name + "' AND password = '" + password + "'";


    connection.query(authenticate, function (err, rows, fields) {
        if (err) throw err;

        if (rows.length === 0) {
            res.status(304).send('YOU SHALL NOT PASS');
            return;
        }
        res.send(rows);

    });
});

app.post('/user', function (req, res) {
    var user = req.query;

    var addUser = "INSERT INTO user (user_name, password, first_name, last_name, email) VALUES ('" + user.user_name + "', '"
        + user.password + "', '" + user.first_name + "', '" + user.last_name + "', '" + user.email + "')";

    connection.query(addUser, function (err, rows, fields) {
        if (err) throw err;
        res.send(rows);

    });
});


app.patch('/user/id', function (req, res) {
    var user = req.query;

    var updateUser = "UPDATE user SET user_name = '" +user.userName+ "', first_name = '"+user.firstName+
        "', last_name = '" +user.lastName +"', email = '" +user.email+"' WHERE id = "+ user.id;

    connection.query(updateUser, function (err, rows, fields) {
        if (err) throw err;
        res.send(rows);

    });
});

//////////////////////////////////


app.get('/list', function (req, res) {
    var userId    = req.query.userId;
    var getLists = "select * from list where userId ='" + userId + "'";

    connection.query(getLists, function (err, rows, fields) {
        if (err) throw err;

        if (rows.length === 0) {
            res.status(304);
            return;
        }
        res.send(rows);

    });
});

app.post('/list', function (req, res) {
    var userId = req.query.userId;
    var listName = req.query.listName;
    var addList = "INSERT INTO list (list_name, userId ) VALUES ('" + listName + "', '" + userId + "')";

    connection.query(addList, function (err, rows) {
        if (err) throw err;
        res.send(rows);

    });
});

app.delete('/list', function (req, res) {
    var listId   = req.query.listId
    var removeList  = "DELETE FROM list WHERE id='" + listId +  "'";

    connection.query(removeList, function (err, rows) {
        if (err) throw err;
        res.send('Delete request for list');

    });
});


app.listen(3000, function () {
    console.log('server is listening on port 3000!');
});