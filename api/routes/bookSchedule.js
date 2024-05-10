const express = require("express");
const router = express.Router();
const {
  getAllSchedule,
  postSchedule,
  getSchedulesByUserId,
  getQueueSchedules,
  ScheduleResult,
  ScheduleAccept,
} = require("../controllers/bookScheduleController");
router.get("/", getAllSchedule);
router.get("/queue", getQueueSchedules);
router.get("/:user_id", getSchedulesByUserId);
router.post("/", postSchedule);
router.put("/:id", ScheduleResult);
router.put("/:id/handle", ScheduleAccept);

module.exports = router;
