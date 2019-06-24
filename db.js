'use strict'

var sqlite3 = require('sqlite3')
let db = new sqlite3.Database('web-app.db', (err) => {
    if (err) {
        return console.error(err.message)
    }
    console.log('Connected to the web-app.db SQlite database.')
})

setTimeout(() => {
    console.log('Running All Functions')
}, 500);

const dbStats = {

        getData: function callAllFunctions() {
            db.serialize(function() {
                db.get('SELECT * FROM milk WHERE date order by date desc limit 1', function(err, row) {
                    if (err) {
                        console.log('Oh no!' + err.message)
                        return
                    }
                    dbStats.lastValues = row
                })

                db.get('SELECT * FROM feed WHERE date order by date desc limit 1', function(err, row) {
                    if (err) {
                        console.log('Oh no!' + err.message)
                        return
                    }
                    dbStats.feedChild = row.minutes
                })

                // Obtain First entry for Graph Data
                db.each('SELECT * FROM (SELECT * FROM milk AS date ORDER BY date DESC LIMIT 1) AS date ORDER BY date LIMIT 1', function(err, row) {
                        if (err) {
                            console.log('Oh no!' + err.message)
                            return
                        }
                        dbStats.last1 = row
                    },
                    // To handle blank data.
                    function(err, rows) {
                        if (rows == 0) {
                            dbStats.last1 = { id: 0, left: 0, right: 0, date: 0, dateonly: 0 }
                        }
                    })

                // Obtain Second entry for Graph Data
                db.each('SELECT * FROM (SELECT * FROM milk AS date ORDER BY date DESC LIMIT 2) AS date ORDER BY date LIMIT 1', function(err, row) {
                        if (err) {
                            console.log('Oh no!' + err.message)
                            return
                        }
                        dbStats.last2 = row
                    },
                    // To handle blank data.
                    function(err, rows) {
                        if (rows == 0) {
                            dbStats.last2 = { id: 0, left: 0, right: 0, date: 0, dateonly: 0 }
                        }
                    })

                // Obtain Third entry for Graph Data
                db.each('SELECT * FROM (SELECT * FROM milk AS date ORDER BY date DESC LIMIT 3) AS date ORDER BY date LIMIT 1', function(err, row) {
                        if (err) {
                            console.log('Oh no!' + err.message)
                            return
                        }
                        dbStats.last3 = row
                    },
                    // To handle blank data.
                    function(err, rows) {
                        if (rows == 0) {
                            dbStats.last3 = { id: 0, left: 0, right: 0, date: 0, dateonly: 0 }
                        }
                    })

                // Obtain Fourth entry for Graph Data
                db.each('SELECT * FROM (SELECT * FROM milk AS date ORDER BY date DESC LIMIT 4) AS date ORDER BY date LIMIT 1', function(err, row) {
                        if (err) {
                            console.log('Oh no!' + err.message)
                            return
                        }
                        dbStats.last4 = row
                    },
                    // To handle blank data.
                    function(err, rows) {
                        if (rows == 0) {
                            dbStats.last4 = { id: 0, left: 2, right: 0, date: 0, dateonly: 0 }
                        }
                    })

                // Obtain Fifth entry for Graph Data
                db.each('SELECT * FROM (SELECT * FROM milk AS date ORDER BY date DESC LIMIT 5) AS date ORDER BY date LIMIT 1',
                    function(err, row) {
                        if (err) {
                            console.log('Oh no!' + err.message)
                            return
                        }
                        dbStats.last5 = row
                    },
                    // To handle blank data.
                    function(err, rows) {
                        if (rows == 0) {
                            dbStats.last5 = { id: 0, left: 0, right: 0, date: 0, dateonly: 0 }
                        }
                    })

                // Obtain total number of express entries
                db.each('SELECT COUNT(*) AS date FROM milk', function(err, row) {
                        if (err) {
                            console.log('Oh no!' + err.message)
                            return
                        }
                        dbStats.countLast = row.date
                    },
                    // To handle blank data.
                    function(err, rows) {
                        if (rows == 0) {
                            dbStats.countLast = { date: 100 }
                        }
                    })
            })
        }
    }
    // The blank date will show as 10:00AM
setTimeout(() => {
    console.log('.')
}, 1000);
setTimeout(() => {
    console.log('.')
}, 2000);
setTimeout(() => {
    console.log('.')
}, 3000);
setTimeout(() => {
    console.log('.')
}, 4000);

setTimeout(() => {
    console.log('Data Request Complete')
}, 5000);
setTimeout(() => {
    console.log('The server is now listening on por 3000')
}, 5500);


module.exports = dbStats