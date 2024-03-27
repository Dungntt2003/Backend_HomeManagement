const express = require("express");
const router = express.Router();
const pool = require("../../db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/", (req, res, next) => {
  const password = req.body.password;
  bcrypt.hash(password, saltRounds, function (err, hash) {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Hashed password:", hash);
    pool.query("INSERT INTO tests VALUES ($1)", [hash], (error, result) => {
      if (error) {
        console.error(error);
        return;
      }
      res.status(200).json({
        message: "Success",
      });
    });
  });
});

module.exports = router;
