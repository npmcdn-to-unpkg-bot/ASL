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
connection.connect();
/****************************************
 Routes
 *****************************************/


app.use(function (req, res, next) {

    res.lastModified = true;

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

    var updateUser = "UPDATE user SET user_name = '" + user.userName + "', first_name = '" + user.firstName +
        "', last_name = '" + user.lastName + "', email = '" + user.email + "' WHERE id = " + user.id;

    connection.query(updateUser, function (err, rows, fields) {
        if (err) throw err;
        res.send(rows);

    });
});

//////////////////////////////////


app.get('/list', function (req, res) {
    var userId   = req.query.userId;
    var getLists = "select * from list where userId ='" + userId + "'";
    console.log(userId);
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
    var userId   = req.query.userId;
    var listName = req.query.listName;
    var addList  = "INSERT INTO list (list_name, userId ) VALUES ('" + listName + "', '" + userId + "')";

    connection.query(addList, function (err, rows) {
        if (err) throw err;
        res.send(rows);

    });
});

app.delete('/list', function (req, res) {
    var listId     = req.query.listId;
    var removeList = "DELETE FROM list WHERE id='" + listId + "'";

    connection.query(removeList, function (err, rows) {
        if (err) throw err;
        res.send('Delete request for list');

    });
});

//////////////////////////////////////////

app.post('/rating', function (req, res) {
    var userId = req.query.userId;
    var listId = req.query.listId;
    var showId = req.query.showId;
    var rating = req.query.rating;

    var addRating = "INSERT INTO ratings (show_id, user_id, list_id, rating, last_updated ) " +
        "VALUES ('" + showId + "', '" + userId + "', '" + listId + "', '" + rating + "', NOW())";

    connection.query(addRating, function (err, rows) {
        if (err) throw err;
        res.send(rows);

    });
});


app.get('/rating', function (req, res) {
    var listId    = req.query.listId;
    var getRating = "select * from ratings where list_id ='" + listId + "'";

    connection.query(getRating, function (err, rows) {
        if (err) throw err;
        res.send(rows)
    })

});

app.delete('/rating', function (req, res) {
    var listId       = req.query.listId;
    var movieId      = req.query.movieId;
    var deleteRating = "Delete from ratings where list_id ='" + listId + "' and show_id = '" + movieId + "'";

    connection.query(deleteRating, function (err, rows) {
        if (err) throw err;
        res.send(rows)
    })

});


////////////////////////////////////////////////////////////
app.get('/friend', function (req, res) {
    var userId        = req.query.userId;
    var getAllFriends = "select * from friends where user_id ='" + userId + "'";

    connection.query(getAllFriends, function (err, rows) {
        if (err) throw err;


        var data = [];
        rows.forEach(function (row) {
            var friendId        = row.friend_id;
            var fetchEachFriend = "select * from user where id ='" + friendId + "';";
            connection.query(fetchEachFriend, function (err, row) {
                data.push(row[0])
            })
        });

        setTimeout(function () {
            res.send(data)
        }, 100);
    })

});

//app.delete('/friend', function (req, res) {
//    var listId       = req.query.listId;
//    var movieId      = req.query.movieId;
//    var deleteRating = "Delete from ratings where list_id ='" + listId + "' and show_id = '" + movieId + "'";
//
//    connection.query(deleteRating, function (err, rows) {
//        if (err) throw err;
//        res.send(rows)
//    })
//
//});


////////////////////////////////////////////////////////////

app.get('/recent/id', function (req, res) {
    var userId = req.query.id;
    var getUsersRecent = "SELECT * FROM ratings WHERE user_id =" + "'"+ userId +"' ORDER BY last_updated DESC LIMIT 5";

    connection.query(getUsersRecent, function (err, rows) {
        res.send(rows);
    })

});


app.get('/recent', function (req, res) {
    var getRecent = "SELECT DISTINCT ratings.show_id, ratings.id, ratings.rating, ratings.last_updated, " +
        "user.first_name, user.last_name, list.id, list.list_name " +
        "FROM ratings " +
        "JOIN user ON ratings.user_id = user.id " +
        "JOIN list ON ratings.list_id = list.id " +
        "ORDER BY last_updated DESC LIMIT 15;";

    connection.query(getRecent, function (err, rows) {
        res.send(rows);
    })

});




app.listen(3000, function () {
    console.log('server is listening on port 3000!');
});