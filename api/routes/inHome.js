const express = require("express");
const router = express.Router();

const {
  addRenter,
  updateRenter,
  getAllInfos,
} = require("../controllers/inHomeController");

router.post("/", addRenter);
router.post("/:id", updateRenter);
router.get("/", getAllInfos);

module.exports = router;
