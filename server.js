var express = require('express')
var tempstats = require('./db.js')
var path = require('path')
var app = express()
var sqlite3 = require('sqlite3')
var db = new sqlite3.Database('web-app.db')

var publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath))

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// All general page links should be listed below
app.get("/", function(request, response) {
    response.sendFile("/index.html", {});
});

app.get("/history", function(request, response) {
    response.sendFile(__dirname + "/public/pages/history.html", {});
});
// Add last expressed amount record
app.post('/', function(request, response) {
    db.run('INSERT INTO milk VALUES (NULL, ?, ?, CURRENT_TIMESTAMP)', [request.body.user.leftBreast, request.body.user.rightBreast], function(err) {
        if (err) {
            console.log("There's another error!" + err.message);
        } else {
            console.log('Record successfully added with id: ' + this.lastID);
        }

        db.run('INSERT INTO feed VALUES (NULL, ?, CURRENT_TIMESTAMP)', [request.body.user.feedChild], function(err2) {
            if (err2) {
                console.log("There's another error!" + err2.message);
            } else {
                console.log('Record successfully added with id: ' + this.lastID);
            }

            return response.redirect('/');
        });
    });
});

// SQL data interaction functions from db.js .
app.get('/left', function(req, res) {
    res.send(tempstats.lastAmountLeft + '')
    console.log(tempstats.lastAmountLeft + '')
})
app.get('/right', function(req, res) {
    res.send(tempstats.lastAmountRight + '')
    console.log(tempstats.lastAmountRight + '')
})
app.get('/feed', function(req, res) {
    res.send(tempstats.feedChild + '')
    console.log(tempstats.feedChild + '')
})

app.get('/l1', function(req, res) {
    var l1Value = parseInt(tempstats.last1.left) + parseInt(tempstats.last1.right)
    console.log(tempstats.last1.left);
    // var left = tempstats.last.left
    res.send(l1Value + '')
        // console.log(left)
        // console.log("Last 1: " + l1Value + 'ml')
})


// Server listen code
var port = 3000
app.listen(port, function() {
    console.log('The server is listening on port ' + port)
})