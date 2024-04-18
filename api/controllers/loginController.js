const pool = require("../../db");
const { createUser, checkUser } = require("../queries/loginQuery");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const createNewUser = (req, res, next) => {
  const { Email, Password, Name, Dob, Gender, University } = req.body;
  bcrypt.hash(Password, saltRounds, function (err, hash) {
    if (err) {
      console.error(err);
      return;
    }
    pool.query(
      createUser,
      [Email, hash, Name, Dob, Gender, University],
      (error, result) => {
        if (error) {
          res.status(500).json({
            error: error.message,
          });
        } else
          res.status(200).json({
            message: "Create user successfully completed",
          });
      }
    );
  });
};

const checkUserByEmail = (req, res, next) => {
  const { Email, Password } = req.body;
  pool.query(checkUser, [Email], (err, result) => {
    if (err) {
      res.status(500).json({
        error: err.message,
      });
      return;
    }
    if (result.rows.length > 0) {
      const hash = result.rows[0].password;
      const userId = result.rows[0].id;
      bcrypt.compare(Password, hash, function (err, result) {
        if (err) {
          res.status(500).json({
            message: err.message,
          });
          return;
        }
        if (result) {
          res.status(200).json({
            message: "Login successfully",
            id: userId,
          });
          return;
        }
        res.status(401).json({
          message: "Wrong password",
        });
      });
    } else {
      res.status(409).json({
        message: "Invalid email",
      });
    }
  });
};
module.exports = { createNewUser, checkUserByEmail };
