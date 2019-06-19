'use strict'

var express = require('express')
var path = require('path')
var app = express()
var dbStats = require('./test/test-db.js/index.js')
var sqlite3 = require('sqlite3')
var db = new sqlite3.Database('test-pwa.db')

var publicPath = path.resolve(__dirname, "public")
app.use(express.static(publicPath))

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded())

// All general page are to be listed below
app.get("/", (request, response) => {
    response.sendFile(publicPath + "/test-index.html", {})
    dbStats.getAll()
    setTimeout(() => {
        console.log(dbStats.allEntries)
    }, 1000);
})

app.get("/leftBreast", (request, response) => {
    response.send(dbStats.allEntries)
    console.log('Got Left')
})

// VVV This doesn't work VVV
var data = dbStats.allEntries

function getLatestDate(data) {
    var sorted_ms = data.map(function(item) {
        return new Date(item.MeasureDate).getTime()
    }).sort()

    var latest_ms = sorted_ms[sorted_ms.length - 1]
    return new Date(latest_ms)
}

// Server listen code
var port = 3000
app.listen(port, () => {
    console.log('The server is listening on port ' + port)
})