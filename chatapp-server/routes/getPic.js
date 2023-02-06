const express = require("express");
const router = express.Router();
const picController = require("../controllers/picController");

router.post("/", picController.getUserPic);

module.exports = router;
