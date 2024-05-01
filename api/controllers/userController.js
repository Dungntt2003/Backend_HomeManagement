const pool = require("../../db");
const {
  getAllUsers,
  getAdmin,
  getAllRenters,
  getUser,
  updateUserEP,
  updateToRenter,
  updateUser,
  deleteUser,
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

const getUserById = (req, res, next) => {
  const id = req.params.id;
  pool.query(getUser, [id], (err, result) => {
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

const updateUserByEmail = (req, res, next) => {
  const id = req.params.id;
  pool.query(getUser, [id], (err, result) => {
    if (result.rows.length == 0) {
      res.status(409).json({
        error: "No users found",
      });
    } else {
      const { Email, Password } = req.body;
      pool.query(updateUserEP, [Email, Password, id], (error, result) => {
        if (error) {
          res.status(500).json({
            error: error.message,
          });
        } else
          res.status(200).json({
            message: "Update email & password successfully completed",
          });
      });
    }
  });
};

const updateVip = (req, res, next) => {
  const id = req.params.id;
  pool.query(getUser, [id], (err, result) => {
    if (result.rows.length == 0) {
      res.status(409).json({
        error: "No users found",
      });
    } else {
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
    }
  });
};

const updateAccount = (req, res, next) => {
  const id = req.params.id;
  pool.query(getUser, [id], (err, result) => {
    if (result.rows.length == 0) {
      res.status(409).json({
        error: "No users found",
      });
    } else {
      const { Name, Dob, Gender, University } = req.body;
      pool.query(
        updateUser,
        [Name, Dob, Gender, University, id],
        (error, result) => {
          if (error) {
            res.status(500).json({
              error: error.message,
            });
          } else
            res.status(200).json({
              message: "Update account successfully completed",
            });
        }
      );
    }
  });
};

const deleteUserById = (req, res, next) => {
  const id = req.params.id;
  pool.query(getUser, [id], (err, result) => {
    if (result.rows.length == 0) {
      res.status(409).json({
        error: "No users found",
      });
    } else {
      pool.query(deleteUser, [id], (error, result) => {
        if (error) {
          res.status(500).json({
            error: error.message,
          });
        } else
          res.status(200).json({
            message: "Delete user successfully completed",
          });
      });
    }
  });
};

module.exports = {
  getUsers,
  getInfoAdmin,
  getUserById,
  getRenters,
  updateUserByEmail,
  updateVip,
  updateAccount,
  deleteUserById,
};
