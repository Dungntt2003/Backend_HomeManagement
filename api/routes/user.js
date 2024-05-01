const express = require("express");
const router = express.Router();
const {
  getUsers,
  getInfoAdmin,
  getRenters,
  getUserById,
  updateVip,
  updateUserByEmail,
  updateAccount,
  deleteUserById,
} = require("../controllers/userController");

router.get("/", getUsers);
router.get("/admin", getInfoAdmin);
router.get("/renter", getRenters);
router.get("/:id", getUserById);
router.put("/:id", updateAccount);
router.put("/:id/changeRole", updateVip);
router.put("/:id/updateAccount", updateUserByEmail);
router.delete("/:id", deleteUserById);

module.exports = router;
