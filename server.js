'use strict'

var express = require('express')
var dbStats = require('./db.js')
var path = require('path')
var app = express()
var dayjs = require('dayjs')
var sqlite3 = require('sqlite3')
var db = new sqlite3.Database('web-app.db')

var stats = () => {

    dbStats.getData()
}

setTimeout(() => {
    stats()
}, 2000);


var publicPath = path.resolve(__dirname, "public")
app.use(express.static(publicPath))

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded())

// All general page links should be listed below
app.get("/", function(req, res) {
    // response.sendFile("/index.html", {})
    res.send(dbStats.getData())
})

app.get("/history", function(request, response) {
        response.sendFile(publicPath + "/pages/history.html", {})
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
    res.send(dbStats.lastValues.left + '')
    console.log(dbStats.lastValues)
})

app.get('/right', function(req, res) {
    res.send(dbStats.lastValues.right + '')
})
app.get('/feed', function(req, res) {
    res.send(dbStats.feedChild + '')
})
app.get('/remaining', function(req, res) {
    if ((5 - dbStats.countLast) <= 0) {
        res.send('true')
        console.log('Limit Reached with ' + (5 - dbStats.countLast))
    } else {
        res.send('false')
        console.log('you have ' + (5 - dbStats.countLast) + ' times left to express' + dbStats.countLast)
    }
})

// Vaules for most recent volume
app.get('/l1', function(req, res) {
    var value = parseInt(dbStats.last1.left) + parseInt(dbStats.last1.right)
    res.send(value + '')
})
app.get('/l2', function(req, res) {
    var value = parseInt(dbStats.last2.left) + parseInt(dbStats.last2.right)
    res.send(value + '')
})
app.get('/l3', function(req, res) {
    var value = parseInt(dbStats.last3.left) + parseInt(dbStats.last3.right)
    res.send(value + '')
})
app.get('/l4', function(req, res) {
    var value = parseInt(dbStats.last4.left) + parseInt(dbStats.last4.right)
    res.send(value + '')
})
app.get('/l5', function(req, res) {
    var value = parseInt(dbStats.last5.left) + parseInt(dbStats.last5.right)
    res.send(value + '')
})

// Values for Last time
app.get('/l1t', function(req, res) {
    var d = dayjs(dbStats.last1.date).add(10, 'hour')
    var value = new Date(d).toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit', hour12: true })
    res.send(value + '')
})
app.get('/l2t', function(req, res) {
    var d = dayjs(dbStats.last2.date).add(10, 'hour')
    var value = new Date(d).toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit', hour12: true })
    res.send(value + '')
})
app.get('/l3t', function(req, res) {
    var d = dayjs(dbStats.last3.date).add(10, 'hour')
    var value = new Date(d).toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit', hour12: true })
    res.send(value + '')
})
app.get('/l4t', function(req, res) {
    var d = dayjs(dbStats.last4.date).add(10, 'hour')
    var value = new Date(d).toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit', hour12: true })
    res.send(value + '')
})
app.get('/l5t', function(req, res) {
    var d = dayjs(dbStats.last5.date).add(10, 'hour')
        // console.log(value)
    var value = new Date(d).toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit', hour12: true })
    res.send(value + '')
        // console.log()
})

// Server listen code
var port = 3000
app.listen(port, function() {})