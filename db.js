'use strict'

var sqlite3 = require('sqlite3')
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
    db.each('SELECT * FROM (SELECT * FROM (SELECT * FROM milk WHERE dateonly = DATE("now"))AS day ORDER BY date DESC LIMIT 1) AS date ORDER BY date LIMIT 1', function(err, row) {
        if (err) {
            console.log('Oh no!' + err.message)
            return
        }
        tempstats.last1 = row
    })
}, 6000)

// Get the second last row to use for Graph data
setInterval(function() {
    db.each('SELECT * FROM (SELECT * FROM (SELECT * FROM milk WHERE dateonly = DATE("now"))AS day ORDER BY date DESC LIMIT 2) AS date ORDER BY date LIMIT 1', function(err, row) {
        if (err) {
            console.log('Oh no!' + err.message)
            return
        }
        tempstats.last2 = row
    })
}, 6000)

// Get third last row to use for Graph data
setInterval(function() {
    db.each('SELECT * FROM (SELECT * FROM (SELECT * FROM milk WHERE dateonly = DATE("now"))AS day ORDER BY date DESC LIMIT 3) AS date ORDER BY date LIMIT 1', function(err, row) {
        if (err) {
            console.log('Oh no!' + err.message)
            return
        }
        tempstats.last3 = row
    })
}, 6000)

// Get fourth last row to use for Graph data
setInterval(function() {
    db.each('SELECT * FROM (SELECT * FROM (SELECT * FROM milk WHERE dateonly = DATE("now"))AS day ORDER BY date DESC LIMIT 4) AS date ORDER BY date LIMIT 1', function(err, row) {
        if (err) {
            console.log('Oh no!' + err.message)
            return
        }
        tempstats.last4 = row
    })
}, 6000)

// Get fifth last row to use for Graph data
setInterval(function() {
    db.each('SELECT * FROM (SELECT * FROM (SELECT * FROM milk WHERE dateonly = DATE("now"))AS day ORDER BY date DESC LIMIT 5) AS date ORDER BY date LIMIT 1',
        function(err, row) {
            if (err) {
                console.log('Oh no!' + err.message)
                return
            }
            tempstats.last5 = row
        })
}, 6000)

// Get the last row to use for Yesterday Graph data
// !!!!!!!!!!!!!!!!! THIS HAS BEEN MODIFIED POORLY
setInterval(function() {
    db.each('SELECT * FROM (SELECT * FROM (SELECT * FROM milk WHERE dateonly = DATE("now", "-2 day"))AS day ORDER BY date DESC LIMIT 1) AS date ORDER BY date LIMIT 1', function(err, row) {
        if (err) {
            console.log('Oh no!' + err.message)
            return
        } else {
            console.log("i work")
        }
        console.log("i work")
    })
}, 6000)

// Get the second last row to use for Yesterday Graph data
setInterval(function() {
    db.each('SELECT * FROM (SELECT * FROM (SELECT * FROM milk WHERE dateonly = DATE("now", "-1 day"))AS day ORDER BY date DESC LIMIT 2) AS date ORDER BY date LIMIT 1', function(err, row) {
        if (err) {
            console.log('Oh no!' + err.message)
            return
        }
        tempstats.last2y = row
    })
}, 6000)

// Get third last row to use for Yesterday Graph data
setInterval(function() {
    db.each('SELECT * FROM (SELECT * FROM (SELECT * FROM milk WHERE dateonly = DATE("now", "-1 day"))AS day ORDER BY date DESC LIMIT 3) AS date ORDER BY date LIMIT 1', function(err, row) {
        if (err) {
            console.log('Oh no!' + err.message)
            return
        }
        tempstats.last3y = row
    })
}, 6000)

// Get fourth last row to use for Yesterday Graph data
setInterval(function() {
    db.each('SELECT * FROM (SELECT * FROM (SELECT * FROM milk WHERE dateonly = DATE("now", "-1 day"))AS day ORDER BY date DESC LIMIT 4) AS date ORDER BY date LIMIT 1', function(err, row) {
        if (err) {
            console.log('Oh no!' + err.message)
            return
        }
        tempstats.last4y = row
    })
}, 6000)

// Get fourth last row to use for Yesterday Graph data
setInterval(function() {
    db.each('SELECT * FROM (SELECT * FROM (SELECT * FROM milk WHERE dateonly = DATE("now", "-1 day"))AS day ORDER BY date DESC LIMIT 5) AS date ORDER BY date LIMIT 1', function(err, row) {
        if (err) {
            console.log('Oh no!' + err.message)
            return
        }
        tempstats.last5y = row
    })
}, 6000)

// Get date for counting purposes
setInterval(function() {
    db.each('SELECT COUNT(*) AS date FROM milk WHERE dateonly = CURRENT_DATE', function(err, row) {
        if (err) {
            console.log('Oh no!' + err.message)
            return
        }
        tempstats.countLast = row.date
    })
}, 6000)

module.exports = tempstats