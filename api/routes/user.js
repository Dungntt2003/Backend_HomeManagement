const express = require("express");
const router = express.Router();
const {
  getUsers,
  getInfoAdmin,
  getRenters,
  updateVip,
} = require("../controllers/userController");

router.get("/", getUsers);
router.get("/admin", getInfoAdmin);
router.get("/renter", getRenters);
router.put("/:id", updateVip);

module.exports = router;
