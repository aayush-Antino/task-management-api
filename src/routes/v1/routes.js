// routes aggregator
const express = require("express");
const router = express.Router();

const authRoutes = require("../../v1/components/auth/auth.routes");
const usersRoutes = require("../../v1/components/users/users.routes");

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);

module.exports = router;
