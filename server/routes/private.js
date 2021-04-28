const express = require("express");
const { getPrivateRoute } = require("../controllers/private");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(protect, getPrivateRoute);

module.exports = router;
