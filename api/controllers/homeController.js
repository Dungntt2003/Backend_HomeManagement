const pool = require("../../db");
const {
  getAllHome,
  getHomeByName,
  postNewHome,
  updateHome,
  deleteHome,
  deleteImages,
} = require("../queries/homeQuery");

const getHome = (req, res, next) => {
  pool.query(getAllHome, (err, result) => {
    if (err) throw err;
    res.status(200).json(result.rows);
  });
};

const getHomeByname = (req, res, next) => {
  const name = req.params.name;
  pool.query(getHomeByName, [name], (error, result) => {
    if (error) throw error;
    if (result.rows.length === 0) {
      res.status(404).json({
        message: "Home not found",
      });
      return;
    }
    res.status(200).json(result.rows);
  });
};

const postHome = (req, res, next) => {
  const {
    Name,
    numberPeople,
    maxPeople,
    launch,
    refrigerator,
    aekon,
    square,
    price,
    toilet,
    bathroom,
  } = req.body;
  pool.query(getHomeByName, [Name], (error, result) => {
    if (result.rows.length > 0) {
      res.status(500).json({
        message: "Name already exists",
      });
    } else {
      pool.query(
        postNewHome,
        [
          Name,
          numberPeople,
          maxPeople,
          launch,
          refrigerator,
          aekon,
          square,
          price,
          toilet,
          bathroom,
        ],
        (error, result) => {
          if (numberPeople > maxPeople) {
            res.status(409).json({
              message: "Number of people cannot be more than max people",
            });
          } else if (error) {
            res.status(500).json({
              message: "Something went wrong",
            });
          } else
            res.status(200).json({
              message: "Home added successfully",
            });
        }
      );
    }
  });
};

const updateHomeByName = (req, res, next) => {
  const name = req.params.name;
  const {
    numberPeople,
    maxPeople,
    launch,
    refrigerator,
    aekon,
    square,
    price,
    toilet,
    bathroom,
  } = req.body;
  pool.query(getHomeByName, [name], (error, result) => {
    if (result.rows.length == 0) {
      res.status(404).json({
        message: "Home not found",
      });
    } else if (numberPeople > maxPeople) {
      res.status(409).json({
        message: "Number of people cannot be more than max people",
      });
    } else {
      pool.query(
        updateHome,
        [
          numberPeople,
          maxPeople,
          launch,
          refrigerator,
          aekon,
          square,
          price,
          toilet,
          bathroom,
          name,
        ],
        (error, result) => {
          if (error) throw error;
          res.status(200).json({
            message: "Home updated successfully",
          });
        }
      );
    }
  });
};

const deleteHomeByName = (req, res, next) => {
  const name = req.params.name;
  pool.query(getHomeByName, [name], (error, result) => {
    if (result.rows.length == 0) {
      res.status(404).json({
        message: "Home not found",
      });
    } else {
      pool.query(deleteImages, [name], (err, result) => {
        if (err) throw err;

        pool.query(deleteHome, [name], (error, result) => {
          if (error) throw error;
          res.status(200).json({
            message: "Home deleted successfully",
          });
        });
      });
    }
  });
};
module.exports = {
  getHome,
  getHomeByname,
  postHome,
  updateHomeByName,
  deleteHomeByName,
};
