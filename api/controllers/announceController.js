const pool = require("../../db");

const {
  insertAnnounce,
  getAllAnnounces,
  updateAnnounce,
  getAnnounceOne,
  deleteAnnounce,
} = require("../queries/announceQuery");

const createNewAnnounce = (req, res, next) => {
  const { title, content, tag } = req.body;
  pool.query(insertAnnounce, [title, content, tag], (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else
      res.status(200).json({
        message: "Create announcement successfully",
      });
  });
};

const getAnnouncements = (req, res, next) => {
  pool.query(getAllAnnounces, (err, results) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else res.status(200).json(results.rows);
  });
};

const updateAnn = (req, res, next) => {
  const id = req.params.id;
  const { title, content, tag } = req.body;
  pool.query(updateAnnounce, [title, content, tag, id], (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else
      res.status(200).json({
        message: "Update announcement successfully",
      });
  });
};
const getAnnounce = (req, res, next) => {
  const id = req.params.id;
  pool.query(getAnnounceOne, [id], (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else res.status(200).json(result.rows[0]);
  });
};

const deleteAnn = (req, res, next) => {
  const id = req.params.id;
  pool.query(deleteAnnounce, [id], (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else
      res.status(200).json({
        message: "Delete announcement successfully",
      });
  });
};
module.exports = {
  createNewAnnounce,
  getAnnouncements,
  updateAnn,
  getAnnounce,
  deleteAnn,
};
