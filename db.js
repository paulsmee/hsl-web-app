'use strict'

var sqlite3 = require('sqlite3')
    // var db = new sqlite3.Database('web-app.db')
let db = new sqlite3.Database('web-app.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the web-app.db SQlite database.');
});

const tempstats = {}


// db.each('SELECT * FROM milk WHERE rowid = 3', function(err, row) {
//     if (err) {
//         console.log('Oh no!' + err.message);
//     } else {
//         console.log('Row ID: ' + row._id + " shows the left breast had an expressed volume of: " + row.left + "ml")
//         tempstats.specificAmountLeft = row.left;

//     }
// })

setInterval(function() {
    db.get('SELECT * FROM milk WHERE date order by date desc limit 1', function(err, row) {
        if (err) {
            console.log('Oh no!' + err.message);
            return;
        }

        // console.log(row)
        tempstats.lastAmountLeft = row.left;


    })
}, 6000)

setInterval(function() {
    db.get('SELECT * FROM milk WHERE date order by date desc limit 1', function(err, row) {
        if (err) {
            console.log('Oh no!' + err.message);
            return;
        }

        // console.log(row)
        tempstats.lastAmountRight = row.right;


    })
}, 6000)
setInterval(function() {
    db.get('SELECT * FROM feed WHERE date order by date desc limit 1', function(err, row) {
        if (err) {
            console.log('Oh no!' + err.message);
            return;
        }

        // console.log(row)
        tempstats.feedChild = row.minutes;


    })
}, 6000)

// Get the last row to use for Graph data
setInterval(function() {
    db.each('SELECT * FROM (SELECT * FROM milk ORDER BY date DESC LIMIT 1) AS date ORDER BY date LIMIT 1', function(err, row) {
        if (err) {
            console.log('Oh no!' + err.message);
            return;
        }

        // console.log(parseInt(row.left) + parseInt(row.right))
        tempstats.last1 = row;


    })
}, 6000)

// Get the second last row to use for Graph data
setInterval(function() {
    db.each('SELECT * FROM (SELECT * FROM milk ORDER BY date DESC LIMIT 2) AS date ORDER BY date LIMIT 1', function(err, row) {
        if (err) {
            console.log('Oh no!' + err.message);
            return;
        }

        // console.log(row)
        tempstats.last2 = row;


    })
}, 6000)

// Get third last row to use for Graph data
setInterval(function() {
    db.each('SELECT * FROM (SELECT * FROM milk ORDER BY date DESC LIMIT 3) AS date ORDER BY date LIMIT 1', function(err, row) {
        if (err) {
            console.log('Oh no!' + err.message);
            return;
        }

        // console.log(row)
        tempstats.last3 = row;


    })
}, 6000)

// Get fourth last row to use for Graph data
setInterval(function() {
    db.each('SELECT * FROM (SELECT * FROM milk ORDER BY date DESC LIMIT 4) AS date ORDER BY date LIMIT 1', function(err, row) {
        if (err) {
            console.log('Oh no!' + err.message);
            return;
        }

        // console.log(row)
        tempstats.last4 = row;


    })
}, 6000)

// Get fourth last row to use for Graph data
setInterval(function() {
    db.each('SELECT * FROM (SELECT * FROM milk ORDER BY date DESC LIMIT 5) AS date ORDER BY date LIMIT 1', function(err, row) {
        if (err) {
            console.log('Oh no!' + err.message);
            return;
        }

        // console.log(row)
        tempstats.last5 = row;


    })
}, 6000)


module.exports = tempstats