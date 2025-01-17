const express = require("express");

const AuthController = require("../controllers/auth");

const router = express.Router();

const jsonParser = express.json();
const auth = require("../middlewares/auth");

router.post("/register", jsonParser, AuthController.register);
router.post("/login", jsonParser, AuthController.login);
router.post("/logout", auth, AuthController.logout);
router.get("/current", auth, AuthController.currentUser);

module.exports = router;
