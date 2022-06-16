/**
 * Mihir Joshi
 * Logbook API
 */

"use strict";

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
    let db = await getDBConnection();
    let qry = 'SELECT * FROM workouts WHERE id = 1';
    let results = await db.get(qry);
    if (results.length !== 0) {
      res.json(results);
    } else {
      res.status(400).type("texet").send("id does not exist")
    }
  } catch (err) {
    res.status(500);
    res.text('Error.');
  }
})

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