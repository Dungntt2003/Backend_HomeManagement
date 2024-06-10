const express = require("express");
const router = express.Router();

const {
  addRenter,
  updateRenter,
  getAllInfos,
  stopRenterByRoom,
  updateBillByRoom,
} = require("../controllers/inHomeController");

router.post("/", addRenter);
router.post("/:id", updateRenter);
router.get("/", getAllInfos);
router.put("/:id", updateRenter);
router.put("/stopRent/:id", stopRenterByRoom);
router.put("/bill/:id", updateBillByRoom);

module.exports = router;
