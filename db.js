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
        tempstats.lastValues = row
        console.log(row)
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
    db.each('SELECT * FROM (SELECT * FROM (SELECT * FROM milk WHERE dateonly = DATE("now", "-10 hours", "localtime"))AS date ORDER BY date DESC LIMIT 1) AS date ORDER BY date LIMIT 1', function(err, row) {
            if (err) {
                console.log('Oh no!' + err.message)
                return
            }
            tempstats.last1 = row
        },
        function(err, rows) {
            if (rows == 0) {
                tempstats.last1 = { id: 0, left: 0, right: 0, date: 0, dateonly: 0 }
            }
        })
}, 6000)

// Get the second last row to use for Graph data
setInterval(function() {
    db.each('SELECT * FROM (SELECT * FROM (SELECT * FROM milk WHERE dateonly = DATE("now", "-10 hours", "localtime"))AS date ORDER BY date DESC LIMIT 2) AS date ORDER BY date LIMIT 1', function(err, row) {
            if (err) {
                console.log('Oh no!' + err.message)
                return
            }
            tempstats.last2 = row
        },
        function(err, rows) {
            if (rows == 0) {
                tempstats.last2 = { id: 0, left: 0, right: 0, date: 0, dateonly: 0 }
            }
        })
}, 6000)

// Get third last row to use for Graph data
setInterval(function() {
    db.each('SELECT * FROM (SELECT * FROM (SELECT * FROM milk WHERE dateonly = DATE("now", "-10 hours", "localtime"))AS date ORDER BY date DESC LIMIT 3) AS date ORDER BY date LIMIT 1', function(err, row) {
            if (err) {
                console.log('Oh no!' + err.message)
                return
            }
            tempstats.last3 = row
        },
        function(err, rows) {
            if (rows == 0) {
                tempstats.last3 = { id: 0, left: 0, right: 0, date: 0, dateonly: 0 }
            }
        })
}, 6000)

// Get fourth last row to use for Graph data
setInterval(function() {
    db.each('SELECT * FROM (SELECT * FROM (SELECT * FROM milk WHERE dateonly = DATE("now", "-10 hours", "localtime"))AS date ORDER BY date DESC LIMIT 4) AS date ORDER BY date LIMIT 1', function(err, row) {
            if (err) {
                console.log('Oh no!' + err.message)
                return
            }
            tempstats.last4 = row
        },
        function(err, rows) {
            if (rows == 0) {
                tempstats.last4 = { id: 0, left: 2, right: 0, date: 0, dateonly: 0 }
            }
        })
}, 6000)

// Get fifth last row to use for Graph data
setInterval(function() {
    db.each('SELECT * FROM (SELECT * FROM (SELECT * FROM milk WHERE dateonly = DATE("now", "-10 hours", "localtime"))AS date ORDER BY date DESC LIMIT 5) AS date ORDER BY date LIMIT 1',
        function(err, row) {
            if (err) {
                console.log('Oh no!' + err.message)
                return
            }
            tempstats.last5 = { id: 0, left: 0, right: 0, date: 0, dateonly: 0 }
        },
        function(err, rows) {
            if (rows == 0) {
                tempstats.last5 = { id: 0, left: 0, right: 0, date: 0, dateonly: 0 }
            }
        })
}, 6000)

// Get the last row to use for Yesterday Graph data
setInterval(function() {
    db.each('SELECT * FROM (SELECT * FROM (SELECT * FROM milk WHERE dateonly = DATE("now", "-1 day", "-10 hours", "localtime"))AS date ORDER BY date DESC LIMIT 1) AS date ORDER BY date LIMIT 1', function(err, row) {
            if (err) {
                console.log('Oh no!' + err.message)
                return
            }
            tempstats.last1y = row
        },
        function(err, rows) {
            if (rows == 0) {
                tempstats.last1y = { id: 0, left: 0, right: 0, date: 0, dateonly: 0 }
            }
        })
}, 6000)

// Get the second last row to use for Yesterday Graph data
setInterval(function() {
    db.each('SELECT * FROM (SELECT * FROM (SELECT * FROM milk WHERE dateonly = DATE("now", "-1 day", "-10 hours", "localtime"))AS date ORDER BY date DESC LIMIT 2) AS date ORDER BY date LIMIT 1', function(err, row) {
            if (err) {
                console.log('Oh no!' + err.message)
                return
            }
            tempstats.last2y = row
        },
        function(err, rows) {
            if (rows == 0) {
                tempstats.last2y = { id: 0, left: 0, right: 0, date: 0, dateonly: 0 }
            }
        })
}, 6000)

// Get third last row to use for Yesterday Graph data
setInterval(function() {
    db.each('SELECT * FROM (SELECT * FROM (SELECT * FROM milk WHERE dateonly = DATE("now", "-1 day", "-10 hours", "localtime"))AS date ORDER BY date DESC LIMIT 3) AS date ORDER BY date LIMIT 1', function(err, row) {
            if (err) {
                console.log('Oh no!' + err.message)
                return
            }
            tempstats.last3y = row
        },
        function(err, rows) {
            if (rows == 0) {
                tempstats.last3y = { id: 0, left: 0, right: 0, date: 0, dateonly: 0 }
            }
        })
}, 6000)

// Get fourth last row to use for Yesterday Graph data
setInterval(function() {
    db.each('SELECT * FROM (SELECT * FROM (SELECT * FROM milk WHERE dateonly = DATE("now", "-1 days", "-10 hours", "localtime"))AS date ORDER BY date DESC LIMIT 4) AS date ORDER BY date LIMIT 1', function(err, row) {
            if (err) {
                console.log('Oh no!' + err.message)
                return
            }
            tempstats.last4y = row
        },
        function(err, rows) {
            if (rows == 0) {
                tempstats.last4y = { id: 0, left: 0, right: 0, date: 0, dateonly: 0 }
            }
        })
}, 6000)

// Get fifth last row to use for Yesterday Graph data
setInterval(function() {
    db.each('SELECT * FROM (SELECT * FROM (SELECT * FROM milk WHERE dateonly = DATE("now", "-1 days", "-10 hours", "localtime"))AS date ORDER BY date DESC LIMIT 5) AS date ORDER BY date LIMIT 1', function(err, row) {
            if (err) {
                console.log('Oh no!' + err.message)
                return
            }
            tempstats.last5y = row
        },
        function(err, rows) {
            if (rows == 0) {
                tempstats.last5y = { id: 0, left: 0, right: 0, date: 0, dateonly: 0 }
            }
        })
}, 6000)

// Get fourth last row to use for Yesterday Graph data
setInterval(function() {
    db.each('SELECT COUNT(*) AS date FROM milk WHERE dateonly = DATE("now", "-10 hours")', function(err, row) {
            if (err) {
                console.log('Oh no!' + err.message)
                return
            }
            tempstats.countLast = row.date
        },
        function(err, rows) {
            if (rows == 0) {
                tempstats.countLast = { date: 100 }
            }
        })
}, 6000)

// The blank date will show as 10:00AM

module.exports = tempstats