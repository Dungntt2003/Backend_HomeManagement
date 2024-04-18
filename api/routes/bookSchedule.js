const express = require("express");
const router = express.Router();
const { postSchedule } = require("../controllers/bookScheduleController");

router.post("/", postSchedule);

module.exports = router;
