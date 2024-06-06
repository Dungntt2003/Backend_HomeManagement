const express = require("express");
const router = express.Router();

const { addRenter, updateRenter } = require("../controllers/inHomeController");

router.post("/", addRenter);
router.post("/:id", updateRenter);

module.exports = router;
