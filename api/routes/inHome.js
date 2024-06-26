const express = require("express");
const router = express.Router();

const {
  addRenter,
  updateRenter,
  getAllInfos,
  stopRenterByRoom,
  updateBillByRoom,
  createNewBill,
  getRenterInfoDetail,
  getBillInfoDetail,
} = require("../controllers/inHomeController");

router.post("/", addRenter);
router.post("/:id", updateRenter);
router.get("/", getAllInfos);
router.put("/:id", updateRenter);
router.put("/stopRent/:id", stopRenterByRoom);
router.put("/bill/:id", updateBillByRoom);
router.get("/bill", createNewBill);
router.get("/bill/:id", getBillInfoDetail);
router.get("/renter/:id", getRenterInfoDetail);

module.exports = router;
