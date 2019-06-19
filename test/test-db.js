'use strict'

var sqlite3 = require('sqlite3')
let db = new sqlite3.Database('test-pwa.db', (err) => {
    if (err) {
        return console.error(err.message)
    }
    console.log('Connected to the test.pwa.db SQlite database.')
})

const dbStats = {

    getAll: function testFunction() {
        db.all('SELECT * FROM express', (err, row) => {
            if (err) {
                console.log('Oh no!' + err.message)
                return
            }
            dbStats.allEntries = row
            console.log(row)
        })
    }

}
module.exports = dbStats