const express = require("express");
const router = express.Router();
const {
  postSchedule,
  getSchedulesByUserId,
} = require("../controllers/bookScheduleController");

router.post("/", postSchedule);
router.get("/:user_id", getSchedulesByUserId);

module.exports = router;
