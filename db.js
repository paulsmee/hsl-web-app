'use strict'

var sqlite3 = require('sqlite3')
    // var db = new sqlite3.Database('web-app.db')
let db = new sqlite3.Database('web-app.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

const tempstats = {}


db.each('SELECT * FROM milk WHERE rowid = 3', function(err, row) {
    if (err) {
        console.log('Oh no!' + err.message);
    } else {
        console.log('Row ID: ' + row._id + " shows the left breast had an expressed volume of: " + row.left + "ml")
        tempstats.specificAmountLeft = row.left;

    }
})

setInterval(function() {
    db.get('SELECT * FROM milk WHERE date order by date desc limit 1', function(err, row) {
        if (err) {
            console.log('Oh no!' + err.message);
            return;
        }

        console.log(row)

        console.log("The last expressed volume from the left breast was: " + row.left + "ml")
        tempstats.lastAmountLeft = row.left;


    })
}, 1000)

setInterval(function() {
    db.get('SELECT * FROM milk WHERE date order by date desc limit 1', function(err, row) {
        if (err) {
            console.log('Oh no!' + err.message);
            return;
        }

        console.log(row)

        console.log("The last expressed volume from the right breast was: " + row.right + "ml")
        tempstats.lastAmountRight = row.right;


    })
}, 1000)
module.exports = tempstats
    // module.exports = db