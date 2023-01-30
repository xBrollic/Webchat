const express = require("express");
const ROLES_LIST = require("../config/roles_list");
const router = express.Router();
const messageController = require("../controllers/messageController");
const verifyRoles = require("../middleware/verifyRoles");

router
  .route("/")
  .delete(verifyRoles(ROLES_LIST.Admin), messageController.deleteMessage);

module.exports = router;
