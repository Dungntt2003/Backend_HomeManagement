const express = require("express");
const router = express.Router();
const pool = require("../../db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/", (req, res, next) => {
  const id = req.body.id;
  const password = req.body.password;
  bcrypt.hash(password, saltRounds, function (err, hash) {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Hashed password:", hash);
    pool.query(
      "INSERT INTO tests (password, id) VALUES ($1,$2)",
      [hash, id],
      (error, result) => {
        if (error) {
          console.error(error);
          return;
        }
        res.status(200).json({
          message: "Success",
        });
      }
    );
  });
});

router.post("/login", (req, res, next) => {
  const { id, password } = req.body;
  pool.query(
    "SELECT password FROM tests where id = $1",
    [id],
    (err, results) => {
      if (err) {
        res.status(500).json({
          message: err.message,
        });
        return;
      }
      if (results.rows.length > 0) {
        const hash = results.rows[0].password;
        bcrypt.compare(password, hash, function (err, result) {
          if (err) {
            res.status(500).json({
              message: err.message,
            });
            return;
          }
          if (result) {
            res.status(200).json({
              message: "Login successfully",
            });
            return;
          }
          res.status(401).json({
            message: "Wrong password",
          });
        });
      }
    }
  );
});
module.exports = router;
