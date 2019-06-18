'use strict'

var express = require('express')
var tempstats = require('./db.js')
var dbstats = require('./db.js')
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
    db.run('INSERT INTO milk VALUES (NULL, ?, ?, CURRENT_TIMESTAMP, CURRENT_DATE)', [request.body.user.leftBreast, request.body.user.rightBreast], function(err) {
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
})
app.get('/right', function(req, res) {
    res.send(tempstats.lastAmountRight + '')
})
app.get('/feed', function(req, res) {
    res.send(tempstats.feedChild + '')
})
app.get('/remaining', function(req, res) {
        if ((5 - tempstats.countLast) <= 0) {
            res.send('true')
            console.log('Limit Reached with ' + (5 - tempstats.countLast))
        } else {
            res.send('false')
            console.log('you have ' + (5 - tempstats.countLast) + ' times left to express' + tempstats.countLast)
        }
    })
    // app.get('/remain', function(req, res) {
    //     if ((5 - tempstats.countLast) <= 0) {
    //         res.send((5 - tempstats.countLast) + '')
    //         console.log('Limit Reached ' + (5 - tempstats.countLast))
    //     } else {
    //         res.send((5 - tempstats.countLast) + '')
    //         console.log('Remainig ' + (5 - tempstats.countLast))
    //     }
    // })

// Vaules for most recent volume
app.get('/l1', function(req, res) {
    var value = parseInt(tempstats.last1.left) + parseInt(tempstats.last1.right)
    res.send(value + '')
})
app.get('/l2', function(req, res) {
    var value = parseInt(tempstats.last2.left) + parseInt(tempstats.last2.right)
    res.send(value + '')
})
app.get('/l3', function(req, res) {
    var value = parseInt(tempstats.last3.left) + parseInt(tempstats.last3.right)
    res.send(value + '')
})
app.get('/l4', function(req, res) {
    var value = parseInt(tempstats.last4.left) + parseInt(tempstats.last4.right)
    res.send(value + '')
})
app.get('/l5', function(req, res) {
    var value = parseInt(tempstats.last5.left) + parseInt(tempstats.last5.right)
    res.send(value + '')
})

// Values for Last time
app.get('/l1t', function(req, res) {
    var value = new Date(tempstats.last1.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    res.send(value + '')
})
app.get('/l2t', function(req, res) {
    var value = new Date(tempstats.last2.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    res.send(value + '')
})
app.get('/l3t', function(req, res) {
    var value = new Date(tempstats.last3.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    res.send(value + '')
})
app.get('/l4t', function(req, res) {
    var value = new Date(tempstats.last4.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    res.send(value + '')
})
app.get('/l5t', function(req, res) {
    var value = new Date(tempstats.last5.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    res.send(value + '')
})

// Values for Yesterday volume
app.get('/l1y', function(req, res) {
    var value = parseInt(tempstats.last1y.left) + parseInt(tempstats.last1y.right)
    res.send(value + '')
})
app.get('/l2y', function(req, res) {
    var value = parseInt(tempstats.last2y.left) + parseInt(tempstats.last2y.right)
    res.send(value + '')
})
app.get('/l3y', function(req, res) {
    var value = parseInt(tempstats.last3y.left) + parseInt(tempstats.last3y.right)
    res.send(value + '')
})
app.get('/l4y', function(req, res) {
    var value = parseInt(tempstats.last4y.left) + parseInt(tempstats.last4y.right)
    res.send(value + '')
})
app.get('/l5y', function(req, res) {
    var value = parseInt(tempstats.last5y.left) + parseInt(tempstats.last5y.right)
    res.send(value + '')
})

// Values for Yesterday time
app.get('/l1yt', function(req, res) {
    var value = new Date(tempstats.last1y.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    res.send(value + '')
})
app.get('/l2yt', function(req, res) {
    var value = new Date(tempstats.last2y.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    res.send(value + '')
})
app.get('/l3yt', function(req, res) {
    var value = new Date(tempstats.last3y.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    res.send(value + '')
})
app.get('/l4yt', function(req, res) {
    var value = new Date(tempstats.last4y.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    res.send(value + '')
})
app.get('/l5yt', function(req, res) {
    var value = new Date(tempstats.last5y.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    res.send(value + '')
})

// Server listen code
var port = 3000
app.listen(port, function() {
    console.log('The server is listening on port ' + port)
})
setInterval(function() {
    // console.log(dbstats)
}, 6500)