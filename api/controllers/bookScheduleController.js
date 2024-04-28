const {
  createASchedule,
  getAllSchedules,
  getScheduleResult,
  getScheduleByUserId,
} = require("../queries/bookScheduleQuery");
const pool = require("../../db");
const postSchedule = (req, res, next) => {
  const { user_id, name, date, user_name, phone, note } = req.body;
  pool.query(
    createASchedule,
    [user_id, name, date, user_name, phone, note],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          message: err.message,
        });
      } else {
        res.status(201).json({
          message: "Schedule Created",
        });
      }
    }
  );
};

const getSchedulesByUserId = (req, res, next) => {
  const user_id = req.params.user_id;
  pool.query(getScheduleByUserId, [user_id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
    return res.status(200).json(result.rows);
  });
};
module.exports = { postSchedule, getSchedulesByUserId };
