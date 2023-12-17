const express = require("express");

const router = express.Router();

const auth = require("../middlewares/auth");

const authRoutes = require("../routes/auth");
const contactRoutes = require("../routes/contacts");

router.use("/users", authRoutes);
router.use("/contacts", auth, contactRoutes);

module.exports = router;
