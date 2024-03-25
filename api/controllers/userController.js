const pool = require("../../db");
const {
  getAllUsers,
  getAdmin,
  getAllRenters,
  updateToRenter,
} = require("../queries/userQuery");

const getUsers = (req, res, next) => {
  pool.query(getAllUsers, (err, result) => {
    if (result.rows.length == 0) {
      res.status(409).json({
        error: "No users found",
      });
    } else if (err) {
      res.status(500).json({
        error: err.message,
      });
    } else res.status(200).json(result.rows);
  });
};

const getInfoAdmin = (req, res, next) => {
  pool.query(getAdmin, (err, result) => {
    if (err) {
      res.status(500).json({
        error: err.message,
      });
    } else res.status(200).json(result.rows);
  });
};

const getRenters = (req, res, next) => {
  pool.query(getAllRenters, (error, result) => {
    if (error) {
      res.status(500).json({
        error: error.message,
      });
    } else res.status(200).json(result.rows);
  });
};
const updateVip = (req, res, next) => {
  const id = req.params.id;
  pool.query(updateToRenter, [id], (error, result) => {
    if (error) {
      res.status(500).json({
        error: error.message,
      });
    } else
      res.status(200).json({
        message: "Update role successfully completed",
      });
  });
};

module.exports = {
  getUsers,
  getInfoAdmin,
  getRenters,
  updateVip,
};
