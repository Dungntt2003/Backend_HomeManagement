const pool = require("../../db");

const { insertNewRenter, updateRenterDate } = require("../queries/inHomeQuery");

const addRenter = (req, res, next) => {
  const { room_id, user_id, startDate, endDate } = req.body;
  pool.query(
    insertNewRenter,
    [room_id, user_id, startDate, endDate],
    (err, result) => {
      if (err) {
        res.status(500).json({
          message: err.message,
        });
      } else {
        res.status(200).json({
          message: "Created successfully",
        });
      }
    }
  );
};

const updateRenter = (req, res, next) => {
  const endDate = req.body.endDate;
  const id = req.params.id;
  pool.query(updateRenterDate, [endDate, id], (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else
      res.status(200).json({
        message: "Updated successfully",
      });
  });
};
module.exports = { addRenter, updateRenter };
