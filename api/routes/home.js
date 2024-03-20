const express = require("express");
const router = express.Router();
const {
  getHome,
  getHomeByname,
  postHome,
  updateHomeByName,
  deleteHomeByName,
} = require("../controllers/homeController");

router.get("/", getHome);
router.post("/", postHome);
router.get("/:name", getHomeByname);
router.put("/:name", updateHomeByName);
router.delete("/:name", deleteHomeByName);

module.exports = router;
