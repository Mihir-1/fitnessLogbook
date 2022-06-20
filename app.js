/**
 * Mihir Joshi
 * Logbook API
 */

"use strict";

console.log("server started");

const express = require('express');
const app = express();
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const multer = require('multer');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(multer().none());

app.get('/logbook/data', async function(req, res) {
  try {
    let date = req.query.date;
    if (date) {
      let db = await getDBConnection();
      let qry = 'SELECT * FROM workouts WHERE date = ?;';
      let results = await db.get(qry, [date]);
      await db.close()
      res.json(results);
    } else {
      res.status(400).type("text").send("Date not included!")
    }
  } catch (err) {
    res.status(500);
    res.type("text").send('Error!');
  }
})

app.post('/logbook/input', async function(req, res) {
  try {
    
  } catch (err) {
    res.status(500);
    res.type("text").send('Error!');
  }
});

/**
 * Establishes a database connection to the database and returns the database object.
 * Any errors that occur should be caught in the function that calls this one.
 * @returns {Object} - The database object for the connection.
 */
 async function getDBConnection() {
  const db = await sqlite.open({
    filename: 'logbook.db',
    driver: sqlite3.Database
  });
  return db;
}

app.use(express.static('public'));
const PORT = process.env.PORT || 8000;
app.listen(PORT);