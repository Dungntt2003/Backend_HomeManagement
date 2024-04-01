const express = require("express");
const router = express.Router();
const {
  createNewUser,
  checkUserByEmail,
} = require("../controllers/loginController");

router.post("/register", createNewUser);
router.post("/login", checkUserByEmail);

module.exports = router;
