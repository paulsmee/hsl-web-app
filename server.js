var express = require('express')
var tempstats = require('./db.js')
var path = require('path')
var app = express()
var sqlite3 = require('sqlite3')
var db = new sqlite3.Database('web-app.db')

var publicPath = path.resolve(__dirname, "public")
app.use(express.static(publicPath))

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded())

// All general page links should be listed below
app.get("/", function(request, response) {
    response.sendFile("/index.html", {})
})

app.get("/history", function(request, response) {
        response.sendFile(__dirname + "/public/pages/history.html", {})
    })
    // Add last expressed amount record
app.post('/', function(request, response) {
    db.run('INSERT INTO milk VALUES (NULL, ?, ?, CURRENT_DATE, CURRENT_TIME)', [request.body.user.leftBreast, request.body.user.rightBreast], function(err) {
        if (err) {
            console.log("There's another error!" + err.message)
        } else {
            console.log('Record successfully added with id: ' + this.lastID)
        }

        db.run('INSERT INTO feed VALUES (NULL, ?, CURRENT_TIMESTAMP)', [request.body.user.feedChild], function(err2) {
            if (err2) {
                console.log("There's another error!" + err2.message)
            } else {
                console.log('Record successfully added with id: ' + this.lastID)
            }

            return response.redirect('/')
        })
    })
})

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

// Data for most recent graph
app.get('/l1', function(req, res) {
    var l1Value = parseInt(tempstats.last1.left) + parseInt(tempstats.last1.right)
    res.send(l1Value + '')
})
app.get('/l2', function(req, res) {
    var l2Value = parseInt(tempstats.last2.left) + parseInt(tempstats.last2.right)
    res.send(l2Value + '')
})
app.get('/l3', function(req, res) {
    var l3Value = parseInt(tempstats.last3.left) + parseInt(tempstats.last3.right)
    res.send(l3Value + '')
})
app.get('/l4', function(req, res) {
    var l4Value = parseInt(tempstats.last4.left) + parseInt(tempstats.last4.right)
    res.send(l4Value + '')
})
app.get('/l5', function(req, res) {
    var l5Value = parseInt(tempstats.last5.left) + parseInt(tempstats.last5.right)
    res.send(l5Value + '')
})

// Time for last values
app.get('/l1t', function(req, res) {
    var date = new Date()
    console.log("today" + date.toLocaleDateString() + ".")
    var l1TValue = tempstats.last1.date
    console.log(l1TValue)
    res.send(l1TValue + '')
})

// app.get('/l2', function(req, res) {
//     var l2Value = parseInt(tempstats.last2.left) + parseInt(tempstats.last2.right)
//     res.send(l2Value + '')
// })
// app.get('/l3', function(req, res) {
//     var l3Value = parseInt(tempstats.last3.left) + parseInt(tempstats.last3.right)
//     res.send(l3Value + '')
// })
// app.get('/l4', function(req, res) {
//     var l4Value = parseInt(tempstats.last4.left) + parseInt(tempstats.last4.right)
//     res.send(l4Value + '')
// })
// app.get('/l5', function(req, res) {
//     var l5Value = parseInt(tempstats.last5.left) + parseInt(tempstats.last5.right)
//     res.send(l5Value + '')
// })

// Server listen code
var port = 3000
app.listen(port, function() {
    console.log('The server is listening on port ' + port)
})