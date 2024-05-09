const {
  createASchedule,
  getAllSchedules,
  getScheduleResult,
  getScheduleByUserId,
  queueSchedules,
  updateScheduleResult,
} = require("../queries/bookScheduleQuery");
const pool = require("../../db");
const { json } = require("express");

const getAllSchedule = (req, res, next) => {
  pool.query(getAllSchedules, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "No schedules found",
      });
    }
    return res.status(200).json(result.rows);
  });
};
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
const getQueueSchedules = (req, res, next) => {
  pool.query(queueSchedules, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "No schedules found",
      });
    }
    return res.status(200).json(result.rows);
  });
};

const ScheduleResult = (req, res, next) => {
  const id = req.params.id;
  const { result } = req.body;
  pool.query(updateScheduleResult, [result, id], (err, result) => {
    if (err)
      return res.status(500).json({
        message: err.message,
      });
    return res.status(200).json({
      message: "Update successful",
    });
  });
};
module.exports = {
  postSchedule,
  getSchedulesByUserId,
  getAllSchedule,
  getQueueSchedules,
  ScheduleResult,
};
