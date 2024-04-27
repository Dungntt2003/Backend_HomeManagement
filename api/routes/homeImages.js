const express = require("express");
const router = express.Router();

const {
  getImages,
  getRoomImages,
} = require("../controllers/homeImagesController");

router.get("/", getImages);
router.get("/:id", getRoomImages);

module.exports = router;
