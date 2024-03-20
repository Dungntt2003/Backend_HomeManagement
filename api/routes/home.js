const express = require("express");
const router = express.Router();
const {
  getHome,
  getHomeByname,
  postHome,
  deleteHomeByName,
} = require("../controllers/homeController");

router.get("/", getHome);
router.post("/", postHome);
router.get("/:name", getHomeByname);
router.delete("/:name", deleteHomeByName);

module.exports = router;
