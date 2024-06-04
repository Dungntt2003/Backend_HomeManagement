const express = require("express");
const router = express.Router();
const {
  createNewAnnounce,
  getAnnouncements,
  updateAnn,
  getAnnounce,
  deleteAnn,
} = require("../controllers/announceController");

router.get("/", getAnnouncements);
router.post("/", createNewAnnounce);
router.put("/:id", updateAnn);
router.get("/:id", getAnnounce);
router.delete("/:id", deleteAnn);

module.exports = router;
