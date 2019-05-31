var express = require('express')
var tempstats = require('./db.js')
var path = require('path')
var app = express()
    // var db = require('./db.js')
var sqlite3 = require('sqlite3')
var db = new sqlite3.Database('web-app.db')

var publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// All general page links should be listed below
app.get("/", function(request, response) {
    response.sendFile("/index.html", {});
});
// Access the parse results as request.body
app.post('/', function(request, response) {
    console.log(request.body.user.leftBoob);
    console.log(request.body.user.rightBoob);
    db.run('INSERT INTO milk VALUES (NULL, ?, ?, CURRENT_TIMESTAMP)', [request.body.user.leftBoob, request.body.user.rightBoob], function(err) {
        if (err) {
            console.log("There's another error!" + err.message);
        } else {
            console.log('Record successfully added with id: ' + this.lastID);
            response.sendFile(__dirname + "/public/index.html");
        }
    });
});

// SQL data interaction functions from db.js
app.get('/left', function(req, res) {
    res.send(tempstats.lastAmountLeft + '')
    console.log(tempstats.lastAmountLeft + '')
})
app.get('/right', function(req, res) {
    res.send(tempstats.lastAmountRight + '')
    console.log(tempstats.lastAmountRight + '')
})

app.get('/selectedTemp', function(req, res) {
    res.send(tempstats.selectedTemp + '')
})

// Json testing sendfile is different to sendFile
app.get('/json', function(req, res) {
    res.sendfile('./test.json', {})
})

// 4xx Errors are served from here
// app.use(function(req, res) {
//     res.status(404)
//     res.render('404.html', {
//         urlAttempted: req.url
//     })
// })

// Server listen code
var port = 3000
app.listen(port, function() {
    console.log('The server is listening on port ' + port)
})