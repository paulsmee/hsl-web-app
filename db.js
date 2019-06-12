'use strict'

var sqlite3 = require('sqlite3')
    // var db = new sqlite3.Database('web-app.db')
let db = new sqlite3.Database('web-app.db', (err) => {
    if (err) {
        return console.error(err.message)
    }
    console.log('Connected to the web-app.db SQlite database.')
})

const tempstats = {}

setInterval(function() {
    db.get('SELECT * FROM milk WHERE date order by date desc limit 1', function(err, row) {
        if (err) {
            console.log('Oh no!' + err.message)
            return
        }
        tempstats.lastAmountLeft = row.left
    })
}, 6000)

setInterval(function() {
    db.get('SELECT * FROM milk WHERE date order by date desc limit 1', function(err, row) {
        if (err) {
            console.log('Oh no!' + err.message)
            return
        }
        tempstats.lastAmountRight = row.right
    })
}, 6000)

setInterval(function() {
    db.get('SELECT * FROM feed WHERE date order by date desc limit 1', function(err, row) {
        if (err) {
            console.log('Oh no!' + err.message)
            return
        }
        tempstats.feedChild = row.minutes
    })
}, 6000)

// Get the last row to use for Graph data
setInterval(function() {
    db.each('SELECT * FROM (SELECT * FROM milk ORDER BY date DESC LIMIT 1) AS date ORDER BY date LIMIT 1', function(err, row1) {
        if (err) {
            console.log('Oh no!' + err.message)
            return
        }
        tempstats.last1 = row1
            // console.log(row1)
    })
}, 6000)

// Get the second last row to use for Graph data
setInterval(function() {
    db.each('SELECT * FROM (SELECT * FROM milk ORDER BY date DESC LIMIT 2) AS date ORDER BY date LIMIT 1', function(err, row2) {
        if (err) {
            console.log('Oh no!' + err.message)
            return
        }
        tempstats.last2 = row2
            // console.log(row2)
    })
}, 6000)

// Get third last row to use for Graph data
setInterval(function() {
    db.each('SELECT * FROM (SELECT * FROM milk ORDER BY date DESC LIMIT 3) AS date ORDER BY date LIMIT 1', function(err, row) {
        if (err) {
            console.log('Oh no!' + err.message)
            return
        }
        tempstats.last3 = row
            // console.log(row)
    })
}, 6000)

// Get fourth last row to use for Graph data
setInterval(function() {
    db.each('SELECT * FROM (SELECT * FROM milk ORDER BY date DESC LIMIT 4) AS date ORDER BY date LIMIT 1', function(err, row) {
        if (err) {
            console.log('Oh no!' + err.message)
            return
        }
        tempstats.last4 = row
            // console.log(row)
    })
}, 6000)

// Get fourth last row to use for Graph data
setInterval(function() {
    db.each('SELECT * FROM (SELECT * FROM milk ORDER BY date DESC LIMIT 5) AS date ORDER BY date LIMIT 1', function(err, row) {
        if (err) {
            console.log('Oh no!' + err.message)
            return
        }
        tempstats.last5 = row
    })
}, 6000)

// Get the last row to use for Yesterday Graph data
setInterval(function() {
    db.each('SELECT * FROM (SELECT * FROM milk ORDER BY date DESC LIMIT 6) AS date ORDER BY date LIMIT 1', function(err, row1) {
        if (err) {
            console.log('Oh no!' + err.message)
            return
        }
        tempstats.last1y = row1
            // console.log(row1)
    })
}, 6000)

// Get the second last row to use for Yesterday Graph data
setInterval(function() {
    db.each('SELECT * FROM (SELECT * FROM milk ORDER BY date DESC LIMIT 7) AS date ORDER BY date LIMIT 1', function(err, row2) {
        if (err) {
            console.log('Oh no!' + err.message)
            return
        }
        tempstats.last2y = row2
            // console.log(row2)
    })
}, 6000)

// Get third last row to use for Yesterday Graph data
setInterval(function() {
    db.each('SELECT * FROM (SELECT * FROM milk ORDER BY date DESC LIMIT 8) AS date ORDER BY date LIMIT 1', function(err, row) {
        if (err) {
            console.log('Oh no!' + err.message)
            return
        }
        tempstats.last3y = row
            // console.log(row)
    })
}, 6000)

// Get fourth last row to use for Yesterday Graph data
setInterval(function() {
    db.each('SELECT * FROM (SELECT * FROM milk ORDER BY date DESC LIMIT 9) AS date ORDER BY date LIMIT 1', function(err, row) {
        if (err) {
            console.log('Oh no!' + err.message)
            return
        }
        tempstats.last4y = row
            // console.log(row)
    })
}, 6000)

// Get fourth last row to use for Yesterday Graph data
setInterval(function() {
    db.each('SELECT * FROM (SELECT * FROM milk ORDER BY date DESC LIMIT 10) AS date ORDER BY date LIMIT 1', function(err, row) {
        if (err) {
            console.log('Oh no!' + err.message)
            return
        }
        tempstats.last5y = row
    })
}, 6000)

module.exports = tempstats