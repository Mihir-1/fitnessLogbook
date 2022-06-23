CREATE TABLE workouts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date DATETIME,
  workout TEXT,
  exercise TEXT,
  setN INTEGER,
  weight REAL,
  reps INTEGER,
  RPE INTEGER,
  notes TEXT
);

-- INSERT INTO workouts (date, workout)
-- VALUES ("06-19-2022", "wkt");

-- DELETE FROM workouts;
-- DROP TABLE workouts;