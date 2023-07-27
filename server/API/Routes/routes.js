const express = require("express");
const router = express.Router();
const controller = require("../Controllers/controller.js");
const authMiddleware = require("../Middlewares/authMiddleware.js");

router.get("/check", (req, res) => {
  res.send("Works");
});

router.post("/signUp", controller.createUser);
router.post("/login", controller.loginUser);
router.post("/setTheme", authMiddleware, controller.setTheme);
router.post("/userProfile", authMiddleware, controller.userProfile);

module.exports = router;
