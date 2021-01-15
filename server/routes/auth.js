const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.post("/login", authController.login);
router.get(
  "/logout",
  authController.middleware.checkLogin,
  authController.logout
);
router.post("/register", authController.register);

module.exports = router;
