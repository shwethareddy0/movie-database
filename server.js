// Import and require express, mysql2
const express = require("express");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "password",
    database: "movie_db",
  },
  console.log(`Connected to the movie_db database.`)
);

// Takes in a movie title, and inserts it into the movies table
app.post("/api/add-movie", (req, res) => {
  const { title } = req.body;
  db.query(
    `INSERT INTO movies(movie_name) VALUES (${title})`,
    function (err, results) {
      console.log(results);
      res.send(results);
    }
  );
});

// Selects movies table and console logs movies
app.get("/api/movies", (req, res) => {
  db.query("SELECT * FROM movies", function (err, results) {
    console.log(results);
    res.send(results);
  });
});

// Deletes a row based on a specified id
app.delete("/api/movie/:id", (req, res) => {
  let deletedRow = id;
  db.query(`DELETE FROM movies WHERE id = ?`, deletedRow, (err, results) => {
    if (err) {
      console.log(err);
    }
    console.log(results);
    res.send(results);
  });
});

app.get("/api/movies", (req, res) => {
  db.query(`SELECT * FROM movies`, function (err, results) {
    console.log(results);
    res.send(results);
  });
});

app.get("/api/movie-reviews", (req, res) => {
  db.query(
    "SELECT movies.movie_name AS Name, reviews.review FROM movies INNER JOIN reviews ON reviews.movie_id = movies.id",
    function (err, results) {
      console.log(results);
      res.json(results);
    });
});

app.put("/api/review/:id", (req, res) => {
  let selectedMovie = id;
  const { updatedReview } = req.body;
  db.query(
    `UPDATE reviews SET review = ${updatedReview} WHERE movie_id = ${selectedMovie}`,
    function (err, results) {
      if (err) {
        console.log(err);
      } else {
        console.log(results);
        res.send(results);
      }
    }
  );
});

app.get("/api/movie-reviews", (req, res) => {
  db.query(`SELECT movies.id AS ID, movies.movie_name AS Name, reviews.review
  FROM movies INNER JOIN reviews
  ON reviews.movie_id = movies.id`),
    function (err, results) {
      if (err) {
        console.log(err);
      }
      console.log(results);
      res.send(results);
    };
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
