const {
  createASchedule,
  getAllSchedules,
  getScheduleResult,
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

module.exports = { postSchedule };
